/*
  Warnings:

  - You are about to drop the column `picture` on the `Gallery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gallery" DROP COLUMN "picture",
ADD COLUMN     "images" TEXT[],
ALTER COLUMN "thumbnail" SET NOT NULL,
ALTER COLUMN "thumbnail" SET DATA TYPE TEXT;
