-- DropForeignKey
ALTER TABLE `keyvaluepair` DROP FOREIGN KEY `KeyValuePair_productContentFixedId_fkey`;

-- AlterTable
ALTER TABLE `keyvaluepair` MODIFY `productContentFixedId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `KeyValuePair` ADD CONSTRAINT `KeyValuePair_productContentFixedId_fkey` FOREIGN KEY (`productContentFixedId`) REFERENCES `ProductContentFixed`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
