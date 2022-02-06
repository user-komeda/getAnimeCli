-- CreateTable
CREATE TABLE `anime` (
    `id` INTEGER NOT NULL,
    `anime_name` VARCHAR(255) NULL,
    `anime_en_name` VARCHAR(255) NULL,
    `anime_year` DATE NULL,
    `anime_cool` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sound` (
    `id` INTEGER NOT NULL,
    `anime_Id` INTEGER NOT NULL,
    `op` VARCHAR(255) NULL,
    `ed` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sound` ADD CONSTRAINT `sound_anime_Id_fkey` FOREIGN KEY (`anime_Id`) REFERENCES `anime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
