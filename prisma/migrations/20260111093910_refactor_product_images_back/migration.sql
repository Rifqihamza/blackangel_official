/*
  Warnings:

  - You are about to drop the column `imagePublicId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imagePublicId",
DROP COLUMN "imageUrl",
ADD COLUMN     "images" TEXT[];
