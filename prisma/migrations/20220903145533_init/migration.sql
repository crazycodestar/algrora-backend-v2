/*
  Warnings:

  - You are about to drop the column `isOneDayDelivery` on the `keyvaluepair` table. All the data in the column will be lost.
  - You are about to drop the column `isADayDelivery` on the `log` table. All the data in the column will be lost.
  - You are about to drop the column `isADayDelivery` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `hasADayDelivery` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `oneDayDeliveryExp` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `sameDayDeliveryExp` on the `store` table. All the data in the column will be lost.
  - Added the required column `isPreOrder` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPreOrder` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderExp` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preOrderExp` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `keyvaluepair` DROP COLUMN `isOneDayDelivery`,
    ADD COLUMN `isPreOrder` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `log` DROP COLUMN `isADayDelivery`,
    ADD COLUMN `isPreOrder` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `isADayDelivery`,
    ADD COLUMN `isPreOrder` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `hasADayDelivery`,
    ADD COLUMN `hasPreOrder` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `store` DROP COLUMN `oneDayDeliveryExp`,
    DROP COLUMN `sameDayDeliveryExp`,
    ADD COLUMN `orderExp` DATETIME(3) NOT NULL,
    ADD COLUMN `preOrderExp` DATETIME(3) NOT NULL;
