-- CreateEnum
CREATE TYPE "PostCategoryType" AS ENUM ('FREE', 'ASK', 'FLEX', 'REVIEW', 'SHAREING');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" "PostCategoryType" NOT NULL DEFAULT 'FREE';
