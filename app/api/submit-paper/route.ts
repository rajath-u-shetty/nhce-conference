import { NextResponse } from 'next/server';
import { CoAuthorDetails, multiFormValidator } from '@/lib/validators/formValidator';
import { db } from '@/lib/db';
import { getUserAuth } from '@/lib/auth/utils';
import { Prisma } from '@prisma/client';
import { Resend } from 'resend';
import EmailTemplate from '@/components/email-templates/form-Submission-email';

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function POST(req: Request) {
  const session = await getUserAuth();
  if (!session.session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { author, coAuthors, file, paperDetails } = multiFormValidator.parse(body);

    const validCoAuthors = coAuthors
      .filter((coAuthor: CoAuthorDetails) =>
        coAuthor.name || coAuthor.email || coAuthor.designation || coAuthor.institute
      )
      .map(validateCoAuthor);

    const userID = session.session.user.id;

    const result = await db.$transaction(
      async (tx) => {
        // Find the latest paper using the new format
        const latestPaper = await tx.paper.findFirst({
          where: {
            id: {
              startsWith: 'QX-Tapas25-'
            }
          },
          orderBy: {
            id: 'desc'
          },
          select: {
            id: true
          }
        });

        let nextNumber = 1;
        if (latestPaper?.id) {
          const match = latestPaper.id.match(/QX-Tapas25-(\d{3})/);
          if (match) {
            nextNumber = parseInt(match[1]) + 1;
          }
        }

        const newId = `QX-Tapas25-${String(nextNumber).padStart(3, '0')}`;

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
            id: newId,
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
        from: 'confirmation@tapas25.com',
        to: author.email,
        cc: coAuthors.map((coAuthor) => coAuthor.email ?? ""),
        subject: `Research Paper Submission: ${paperDetails.title}`,
        react: EmailTemplate({
          paperId: result.id,
          paperTitle: paperDetails.title,
          abstract: paperDetails.abstract,
          author: author,
          coAuthors: validCoAuthors,
          fileUrl: file.fileUrl,
        }) as React.ReactElement,
      });

      if (!emailData || emailError) {
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
