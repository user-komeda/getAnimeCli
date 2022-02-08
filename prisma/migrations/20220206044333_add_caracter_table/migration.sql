-- CreateTable
CREATE TABLE `caracter` (
    `id` INTEGER NOT NULL,
    `anime_Id` INTEGER NOT NULL,
    `caracter` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `caracter` ADD CONSTRAINT `caracter_anime_Id_fkey` FOREIGN KEY (`anime_Id`) REFERENCES `anime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
