/*
  Warnings:

  - You are about to drop the column `author` on the `news_articles` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `news_articles` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `news_articles` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `news_articles` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `organization_members` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `umkms` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "news_articles_category_idx";

-- AlterTable
ALTER TABLE "news_articles" DROP COLUMN "author",
DROP COLUMN "category",
DROP COLUMN "imageUrl",
DROP COLUMN "link",
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "organization_members" DROP COLUMN "imageUrl",
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "umkms" DROP COLUMN "imageUrl",
ADD COLUMN     "image" TEXT;
