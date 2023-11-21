/*
  Warnings:

  - You are about to drop the `Fav` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Fav" DROP CONSTRAINT "Fav_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Fav" DROP CONSTRAINT "Fav_postId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likeUsers" TEXT[];

-- DropTable
DROP TABLE "Fav";
