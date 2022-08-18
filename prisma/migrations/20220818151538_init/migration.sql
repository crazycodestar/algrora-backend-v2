/*
  Warnings:

  - You are about to drop the column `description` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `ordertype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ordertypeoptions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `basePrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isOrder` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oneDayDeliveryExp` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sameDayDeliveryExp` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ordertype` DROP FOREIGN KEY `OrderType_productId_fkey`;

-- DropForeignKey
ALTER TABLE `ordertype` DROP FOREIGN KEY `OrderType_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `ordertypeoptions` DROP FOREIGN KEY `OrderTypeOptions_orderTypeId_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `description`,
    DROP COLUMN `imageUrl`,
    DROP COLUMN `type`,
    ADD COLUMN `basePrice` INTEGER NOT NULL,
    ADD COLUMN `hasADayDelivery` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isOrder` BOOLEAN NOT NULL,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `store` ADD COLUMN `oneDayDeliveryExp` DATETIME(3) NOT NULL,
    ADD COLUMN `sameDayDeliveryExp` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `imageUrl`;

-- DropTable
DROP TABLE `ordertype`;

-- DropTable
DROP TABLE `ordertypeoptions`;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `isOrder` BOOLEAN NOT NULL,
    `isADayDelivery` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `storeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `isOrder` BOOLEAN NOT NULL,
    `isADayDelivery` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `storeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductContentFixed` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `price` INTEGER NULL,
    `orderId` INTEGER NOT NULL,
    `logId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductContent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `price` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Option` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productContentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KeyValuePair` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(255) NOT NULL,
    `amount` INTEGER NULL DEFAULT 0,
    `description` VARCHAR(191) NULL,
    `isOneDayDelivery` BOOLEAN NULL DEFAULT false,
    `optionId` INTEGER NOT NULL,
    `productContentFixedId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImageUri` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(255) NOT NULL,
    `productContentId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `productContentFixedId` INTEGER NOT NULL,

    UNIQUE INDEX `ImageUri_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` ENUM('USER', 'ADMIN', 'SELLER') NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductContentFixed` ADD CONSTRAINT `ProductContentFixed_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductContentFixed` ADD CONSTRAINT `ProductContentFixed_logId_fkey` FOREIGN KEY (`logId`) REFERENCES `Log`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductContent` ADD CONSTRAINT `ProductContent_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Option` ADD CONSTRAINT `Option_productContentId_fkey` FOREIGN KEY (`productContentId`) REFERENCES `ProductContent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KeyValuePair` ADD CONSTRAINT `KeyValuePair_optionId_fkey` FOREIGN KEY (`optionId`) REFERENCES `Option`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KeyValuePair` ADD CONSTRAINT `KeyValuePair_productContentFixedId_fkey` FOREIGN KEY (`productContentFixedId`) REFERENCES `ProductContentFixed`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImageUri` ADD CONSTRAINT `ImageUri_productContentId_fkey` FOREIGN KEY (`productContentId`) REFERENCES `ProductContent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImageUri` ADD CONSTRAINT `ImageUri_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImageUri` ADD CONSTRAINT `ImageUri_productContentFixedId_fkey` FOREIGN KEY (`productContentFixedId`) REFERENCES `ProductContentFixed`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
