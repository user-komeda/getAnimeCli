-- CreateTable
CREATE TABLE `staff` (
    `id` INTEGER NOT NULL,
    `anime_Id` INTEGER NOT NULL,
    `staff` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `staff` ADD CONSTRAINT `staff_anime_Id_fkey` FOREIGN KEY (`anime_Id`) REFERENCES `anime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
