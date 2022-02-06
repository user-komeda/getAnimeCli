-- CreateTable
CREATE TABLE `voice_actor` (
    `id` INTEGER NOT NULL,
    `caracter_Id` INTEGER NOT NULL,
    `voice_actor` VARCHAR(255) NULL,
    `animeId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `voice_actor` ADD CONSTRAINT `voice_actor_animeId_fkey` FOREIGN KEY (`animeId`) REFERENCES `anime`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `voice_actor` ADD CONSTRAINT `voice_actor_caracter_Id_fkey` FOREIGN KEY (`caracter_Id`) REFERENCES `caracter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
