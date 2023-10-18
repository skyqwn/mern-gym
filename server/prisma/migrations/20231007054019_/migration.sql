-- AlterTable
ALTER TABLE "User" ADD COLUMN     "providerId" TEXT,
ALTER COLUMN "email" DROP NOT NULL;
