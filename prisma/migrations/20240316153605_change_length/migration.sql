-- AlterTable
ALTER TABLE `anime` MODIFY `anime_name` VARCHAR(500) NULL,
    MODIFY `anime_en_name` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `character` MODIFY `character` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `episode` MODIFY `episode` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `sound` MODIFY `op` VARCHAR(500) NULL,
    MODIFY `ed` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `staff` MODIFY `staff` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `voice_actor` MODIFY `voice_actor` VARCHAR(500) NULL;
