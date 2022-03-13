/*
  Warnings:

  - You are about to drop the column `caracter_Id` on the `voice_actor` table. All the data in the column will be lost.
  - You are about to drop the `caracter` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `character_Id` to the `voice_actor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `caracter` DROP FOREIGN KEY `caracter_anime_Id_fkey`;

-- DropForeignKey
ALTER TABLE `voice_actor` DROP FOREIGN KEY `voice_actor_caracter_Id_fkey`;

-- AlterTable
ALTER TABLE `voice_actor` DROP COLUMN `caracter_Id`,
    ADD COLUMN `character_Id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `caracter`;

-- CreateTable
CREATE TABLE `character` (
    `id` INTEGER NOT NULL,
    `anime_Id` INTEGER NOT NULL,
    `character` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `character` ADD CONSTRAINT `character_anime_Id_fkey` FOREIGN KEY (`anime_Id`) REFERENCES `anime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `voice_actor` ADD CONSTRAINT `voice_actor_character_Id_fkey` FOREIGN KEY (`character_Id`) REFERENCES `character`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
