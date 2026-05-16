/*
  Warnings:

  - Added the required column `updated_at` to the `Batch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Catalog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Batch" ADD COLUMN     "name" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "xlsx_url" TEXT;

-- AlterTable
ALTER TABLE "Catalog" ADD COLUMN     "file_type" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "situation" TEXT DEFAULT 'pendente',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "prod_gtin" SET DEFAULT 'SEM GTIN';

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
