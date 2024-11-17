/*
  Warnings:

  - You are about to drop the column `paperId` on the `File` table. All the data in the column will be lost.
  - The `uploadedAt` column on the `File` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[fileId]` on the table `Paper` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CoAuthor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedBy` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_paperId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_userId_fkey";

-- DropForeignKey
ALTER TABLE "Paper" DROP CONSTRAINT "Paper_userId_fkey";

-- DropIndex
DROP INDEX "File_paperId_key";

-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CoAuthor" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "designation" DROP NOT NULL,
ALTER COLUMN "institute" DROP NOT NULL;

-- AlterTable
ALTER TABLE "File" DROP COLUMN "paperId",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "uploadedBy" TEXT NOT NULL,
DROP COLUMN "uploadedAt",
ADD COLUMN     "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Paper" ADD COLUMN     "fileId" TEXT;

-- CreateIndex
CREATE INDEX "Author_paperId_idx" ON "Author"("paperId");

-- CreateIndex
CREATE INDEX "CoAuthor_paperId_idx" ON "CoAuthor"("paperId");

-- CreateIndex
CREATE INDEX "File_userId_idx" ON "File"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Paper_fileId_key" ON "Paper"("fileId");

-- CreateIndex
CREATE INDEX "Paper_userId_idx" ON "Paper"("userId");

-- AddForeignKey
ALTER TABLE "Paper" ADD CONSTRAINT "Paper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paper" ADD CONSTRAINT "Paper_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
