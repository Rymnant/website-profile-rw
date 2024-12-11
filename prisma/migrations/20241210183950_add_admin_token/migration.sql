/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `admins` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `admins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "admins_token_key" ON "admins"("token");
