/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NewsArticle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrganizationMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UMKM` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UMKMItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UMKM" DROP CONSTRAINT "UMKM_umkmItemId_fkey";

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "NewsArticle";

-- DropTable
DROP TABLE "OrganizationMember";

-- DropTable
DROP TABLE "UMKM";

-- DropTable
DROP TABLE "UMKMItem";

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_articles" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT,
    "link" TEXT NOT NULL,

    CONSTRAINT "news_articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_members" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "organization_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "umkm_items" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "umkm_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "umkms" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "label" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT,
    "imageUrl" TEXT,
    "umkmItemId" TEXT NOT NULL,

    CONSTRAINT "umkms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE INDEX "news_articles_category_idx" ON "news_articles"("category");

-- CreateIndex
CREATE INDEX "umkms_category_idx" ON "umkms"("category");

-- AddForeignKey
ALTER TABLE "umkms" ADD CONSTRAINT "umkms_umkmItemId_fkey" FOREIGN KEY ("umkmItemId") REFERENCES "umkm_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
