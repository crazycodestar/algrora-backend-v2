/*
  Warnings:

  - You are about to drop the column `roomNumber` on the `user` table. All the data in the column will be lost.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `imageUrl` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `roomNumber`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL;
