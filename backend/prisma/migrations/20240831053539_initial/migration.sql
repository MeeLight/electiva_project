-- CreateTable
CREATE TABLE `Producto` (
    `codigo` VARCHAR(8) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `stockmax` INTEGER NOT NULL,
    `stockmin` INTEGER NOT NULL,
    `precio` DOUBLE NOT NULL,
    `codcat` VARCHAR(4) NOT NULL,

    UNIQUE INDEX `Producto_codigo_key`(`codigo`),
    UNIQUE INDEX `Producto_codcat_key`(`codcat`),
    PRIMARY KEY (`codigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `coocat` VARCHAR(4) NOT NULL,
    `descripcion` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Categoria_coocat_key`(`coocat`),
    PRIMARY KEY (`coocat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_codcat_fkey` FOREIGN KEY (`codcat`) REFERENCES `Categoria`(`coocat`) ON DELETE RESTRICT ON UPDATE CASCADE;
