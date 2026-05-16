-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "contact" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Catalog" (
    "id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "file_url" TEXT,
    "original_filename" TEXT,
    "status" TEXT NOT NULL DEFAULT 'not_started',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Catalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Batch" (
    "id" TEXT NOT NULL,
    "catalog_id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "batch_number" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "products_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "prod_descricao" TEXT,
    "prod_modelo" TEXT,
    "forn_id" TEXT,
    "prod_grupo_id" TEXT,
    "prod_custo_valor" DOUBLE PRECISION,
    "codigo_forn" TEXT,
    "prod_ncm" TEXT,
    "prod_gtin" TEXT,
    "cor" TEXT,
    "caracteristica1" TEXT,
    "caracteristica2" TEXT,
    "caracteristica3" TEXT,
    "caracteristica4" TEXT,
    "caracteristica5" TEXT,
    "caracteristica6" TEXT,
    "prod_altura" DOUBLE PRECISION,
    "prod_largura" DOUBLE PRECISION,
    "prod_profund" DOUBLE PRECISION,
    "prod_volumes" INTEGER,
    "reviewed" BOOLEAN NOT NULL DEFAULT false,
    "imported" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Catalog" ADD CONSTRAINT "Catalog_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_catalog_id_fkey" FOREIGN KEY ("catalog_id") REFERENCES "Catalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
