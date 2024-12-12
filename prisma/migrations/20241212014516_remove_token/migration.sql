/*
  Warnings:

  - You are about to drop the column `token` on the `admins` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "admins_token_key";

-- AlterTable
ALTER TABLE "admins" DROP COLUMN "token";
