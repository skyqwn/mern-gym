/*
  Warnings:

  - The values [SHAREING] on the enum `PostCategoryType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PostCategoryType_new" AS ENUM ('FREE', 'ASK', 'FLEX', 'REVIEW', 'SHARING');
ALTER TABLE "Post" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "Post" ALTER COLUMN "category" TYPE "PostCategoryType_new" USING ("category"::text::"PostCategoryType_new");
ALTER TYPE "PostCategoryType" RENAME TO "PostCategoryType_old";
ALTER TYPE "PostCategoryType_new" RENAME TO "PostCategoryType";
DROP TYPE "PostCategoryType_old";
ALTER TABLE "Post" ALTER COLUMN "category" SET DEFAULT 'FREE';
COMMIT;
