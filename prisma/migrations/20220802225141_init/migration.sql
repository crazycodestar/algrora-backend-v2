/*
  Warnings:

  - You are about to drop the `conversation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `thoughts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imageUrl` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `conversation` DROP FOREIGN KEY `Conversation_contributorId_fkey`;

-- DropForeignKey
ALTER TABLE `conversation` DROP FOREIGN KEY `Conversation_thoughtId_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_conversationId_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_userId_fkey`;

-- DropForeignKey
ALTER TABLE `thoughts` DROP FOREIGN KEY `Thoughts_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `imageUrl` VARCHAR(255) NOT NULL,
    ADD COLUMN `roomNumber` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `conversation`;

-- DropTable
DROP TABLE `message`;

-- DropTable
DROP TABLE `thoughts`;

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `topic` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `notificationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Store` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isActive` BOOLEAN NULL DEFAULT true,
    `ownerId` INTEGER NOT NULL,

    UNIQUE INDEX `Store_ownerId_key`(`ownerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageUrl` VARCHAR(255) NOT NULL,
    `description` VARCHAR(191) NULL,
    `type` ENUM('ORDER', 'PRODUCT') NOT NULL,
    `storeId` INTEGER NOT NULL,

    UNIQUE INDEX `Product_storeId_key`(`storeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('DAYWAIT', 'SAMEDAY') NOT NULL,
    `expiration` DATETIME(3) NULL,
    `storeId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,

    UNIQUE INDEX `OrderType_storeId_key`(`storeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderTypeOptions` (
    `option` VARCHAR(191) NOT NULL,
    `orderTypeId` INTEGER NOT NULL,

    UNIQUE INDEX `OrderTypeOptions_orderTypeId_key`(`orderTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_notificationId_fkey` FOREIGN KEY (`notificationId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderType` ADD CONSTRAINT `OrderType_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderType` ADD CONSTRAINT `OrderType_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderTypeOptions` ADD CONSTRAINT `OrderTypeOptions_orderTypeId_fkey` FOREIGN KEY (`orderTypeId`) REFERENCES `OrderType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
