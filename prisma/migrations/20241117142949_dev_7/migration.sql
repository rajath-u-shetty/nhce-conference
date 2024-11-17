/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `File` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "updatedAt",
ALTER COLUMN "uploadedAt" DROP DEFAULT,
ALTER COLUMN "uploadedAt" SET DATA TYPE TEXT;
