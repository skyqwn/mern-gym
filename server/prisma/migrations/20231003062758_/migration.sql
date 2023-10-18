/*
  Warnings:

  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.

*/
-- CreateEnum
CREATE TYPE "ProviderType" AS ENUM ('LOCAL', 'GOOGLE', 'KAKAO');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" "ProviderType" NOT NULL DEFAULT 'LOCAL',
ADD COLUMN     "refreshToken" TEXT,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "password" SET DATA TYPE VARCHAR(20);
