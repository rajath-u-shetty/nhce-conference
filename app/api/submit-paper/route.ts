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

    // Create the paper and related records in a transaction with timeout and retry logic
    const result = await db.$transaction(
      async (tx) => {
        // 1. Create the file record
        const fileRecord = await tx.file.create({
          data: {
            name: file.name,
            fileUrl: file.fileUrl,
            fileSize: file.fileSize,
            userId: userId,
            uploadedBy: file.uploadedBy,
            uploadedAt: file.uploadedAt,
          },
        });

        // 2. Create the paper record with authors
        const paper = await tx.paper.create({
          data: {
            title: paperDetails.title,
            abstract: paperDetails.abstract,
            userId: userId,
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
    });
  } catch (error) {
    console.error('API error:', error);

    // Handle specific Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2028': // Transaction timeout
          return NextResponse.json(
            { message: 'Request timeout. Please try again.' },
            { status: 408 }
          );
        case 'P2002': // Unique constraint violation
          return NextResponse.json(
            { message: 'A paper with this information already exists.' },
            { status: 409 }
          );
        case 'P2003': // Foreign key constraint failure
          return NextResponse.json(
            { message: 'Invalid reference data provided.' },
            { status: 400 }
          );
        default:
          return NextResponse.json(
            { message: 'Database error occurred. Please try again.' },
            { status: 500 }
          );
      }
    }

    // Handle validation errors
    if (error instanceof Prisma.PrismaClientValidationError) {
      return NextResponse.json(
        { message: 'Invalid data format provided.' },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { message: 'Error submitting paper. Please try again.' },
      { status: 500 }
    );
  }
}
