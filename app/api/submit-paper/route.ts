import { NextResponse } from 'next/server';
import { CoAuthorDetails, multiFormValidator } from '@/lib/validators/formValidator';
import { db } from '@/lib/db';
import { getUserAuth } from '@/lib/auth/utils';
import { Prisma } from '@prisma/client';
import { Resend } from 'resend';
import EmailTemplate from '@/components/email-templates/form-Submission-email';

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to ensure coAuthor data matches the required type
function validateCoAuthor(coAuthor: CoAuthorDetails): {
  name: string;
  email: string;
  designation: string;
  institute: string;
} {
  return {
    name: coAuthor.name || '',
    email: coAuthor.email || '',
    designation: coAuthor.designation || '',
    institute: coAuthor.institute || '',
  };
}

export async function POST(req: Request, res: Response) {
  const session = await getUserAuth();
  if (!session.session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { author, coAuthors, file, paperDetails } = multiFormValidator.parse(body);

    // Filter out empty co-authors and validate the remaining ones
    const validCoAuthors = coAuthors
      .filter((coAuthor: CoAuthorDetails) =>
        coAuthor.name || coAuthor.email || coAuthor.designation || coAuthor.institute
      )
      .map(validateCoAuthor); // Transform to ensure all required fields exist

    const userID = session.session.user.id;

    // Create the paper and related records in a transaction
    const result = await db.$transaction(
      async (tx) => {
        const fileRecord = await tx.file.create({
          data: {
            name: file.name,
            fileUrl: file.fileUrl,
            fileSize: file.fileSize,
            userId: userID,
            uploadedBy: file.uploadedBy,
            uploadedAt: file.uploadedAt,
          },
        });

        const paper = await tx.paper.create({
          data: {
            title: paperDetails.title,
            abstract: paperDetails.abstract,
            userId: userID,
            fileId: fileRecord.id,
            url: file.fileUrl,
            authors: {
              create: {
                name: author.name,
                email: author.email,
                mobile: author.mobileNumber,
                designation: author.designation,
                institute: author.institute,
              },
            },
            coAuthors: validCoAuthors.length > 0 ? {
              create: validCoAuthors,
            } : undefined,
          },
          include: {
            authors: true,
            coAuthors: true,
            file: true,
          },
        });
        return paper;
      },
      {
        maxWait: 10000,
        timeout: 30000,
        isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
      }
    );

    try {
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'rajathushetty56@gmail.com',
        subject: `Research Paper Submission: ${paperDetails.title}`,
        react: EmailTemplate({
          paperTitle: paperDetails.title,
          abstract: paperDetails.abstract,
          author: author,
          coAuthors: validCoAuthors,
          fileUrl: file.fileUrl,
        }) as React.ReactElement,
      });

      if (emailError) {
        console.error('Email sending failed:', emailError);
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    return NextResponse.json({
      message: 'Paper submitted successfully',
      paper: result,
      status: 200,
    });
  } catch (error) {
    console.error('Error in paper submission:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2028':
          return NextResponse.json(
            { message: 'Request timeout. Please try again.' },
            { status: 408 }
          );
        case 'P2002':
          return NextResponse.json(
            { message: 'A paper with this information already exists.' },
            { status: 409 }
          );
        case 'P2003':
          return NextResponse.json(
            {
              message: 'Invalid user ID or reference data provided.',
              details: 'Failed to create record. The provided user ID does not exist in the database.',
              error: error.meta
            },
            { status: 400 }
          );
        default:
          return NextResponse.json(
            {
              message: 'Database error occurred. Please try again.',
              code: error.code,
              meta: error.meta
            },
            { status: 500 }
          );
      }
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      return NextResponse.json(
        { message: 'Invalid data format provided.', error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Error submitting paper. Please try again.', error: error },
      { status: 500 }
    );
  }
}
