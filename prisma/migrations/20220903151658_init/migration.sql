/*
  Warnings:

  - Made the column `price` on table `productcontent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `productcontentfixed` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `productcontent` MODIFY `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `productcontentfixed` MODIFY `price` INTEGER NOT NULL;
