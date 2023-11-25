-- AlterTable
ALTER TABLE "Gallery" ADD COLUMN     "likeUsers" TEXT[] DEFAULT ARRAY[]::TEXT[];
