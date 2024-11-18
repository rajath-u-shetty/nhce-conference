// app/api/submit-paper/route.ts
import { NextResponse } from 'next/server';
import { CoAuthorDetails, multiFormValidator } from '@/lib/validators/formValidator';
import { db } from '@/lib/db';
import { getUserAuth } from '@/lib/auth/utils';
import { Prisma } from '@prisma/client';

export async function POST(req: Request) {
  const session = await getUserAuth();
  if (!session.session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { author, coAuthors, file, userId, paperDetails } = multiFormValidator.parse(body);

    // Filter out empty co-authors before processing
    const validCoAuthors = coAuthors.filter((coAuthor: CoAuthorDetails) => 
      coAuthor.name || coAuthor.email || coAuthor.designation || coAuthor.institute
    );

    const userID = session.session.user.id;

    // Create the paper and related records in a transaction with timeout and retry logic
    const result = await db.$transaction(
      async (tx) => {
        // 1. Create the file record
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

        // 2. Create the paper record with authors
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
              create: validCoAuthors.map((coAuthor: CoAuthorDetails) => ({
                name: coAuthor.name || '',
                email: coAuthor.email || '',
                designation: coAuthor.designation || '',
                institute: coAuthor.institute || '',
              })),
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
        maxWait: 10000, // Maximum time to wait for transaction to start (10 seconds)
        timeout: 30000, // Maximum time for the transaction to complete (30 seconds)
        isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted, // Less strict isolation level
      }
    );

    return NextResponse.json({
      message: 'Paper submitted successfully',
      paper: result,
      status: 200,
    });
  } catch (error: any) {
    console.error('Detailed API error:', {
      error: error,
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    });

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
              details: `Failed to create record. The provided user ID does not exist in the database.`,
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
      { message: 'Error submitting paper. Please try again.', error: error.message },
      { status: 500 }
    );
  }
}
