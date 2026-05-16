import express from "express";
import cors from "cors";
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";
import { supplierRoutes } from "./modules/suppliers/routes";
import { catalogRoutes } from "./modules/catalogs/routes";
import { batchRoutes } from './modules/batches/routes'
import { productRoutes } from './modules/products/routes'
import extractTestRoute from "./extractor/tests/extract-test";

const app = express();

app.use(cors());

app.use(
  express.json({
    limit: "10mb",
  }),
);

app.use("/suppliers", supplierRoutes);
app.use("/catalogs", catalogRoutes);
app.use('/batches', batchRoutes)
app.use('/products', productRoutes)
app.use(extractTestRoute);

app.get("/health", (req, res) => {
  return res.json({
    status: "ok",
  });
});

app.post("/generate-xlsx", async (req, res) => {
  try {
    const { supplier, products } = req.body;

    /**
     * VALIDAÇÕES
     */
    if (!supplier) {
      return res.status(400).json({
        error: "Fornecedor obrigatório",
      });
    }

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({
        error: "Products inválido",
      });
    }

    /**
     * TEMPLATE
     */
    const workbook = new ExcelJS.Workbook();

    const templatePath = path.resolve("src", "templates", "template.xlsx");

    await workbook.xlsx.readFile(templatePath);

    console.log(
      "Sheets disponíveis:",
      workbook.worksheets.map((w) => w.name),
    );

    const worksheet = workbook.getWorksheet(1);

    if (!worksheet) {
      return res.status(500).json({
        error: "Planilha não encontrada",
      });
    }

    /**
     * MAPEAMENTO REAL ERP
     */
    const columns: Record<string, number> = {
      prod_descricao: 2,
      prod_modelo: 3,
      forn_id: 4,
      prod_grupo_id: 6,
      prod_custo_valor: 7,
      codigo_forn: 11,
      prod_ncm: 13,
      prod_gtin: 14,

      caracteristica1: 15,
      caracteristica2: 16,
      caracteristica3: 17,
      caracteristica4: 18,
      caracteristica5: 19,
      caracteristica6: 20,

      prod_altura: 26,
      prod_largura: 27,
      prod_profund: 28,
      prod_volumes: 29,
    };

    /**
     * PRODUTOS COMEÇAM NA LINHA 3
     */
    products.forEach((product: Record<string, any>, index: number) => {
      /**
       * DEFAULTS AUTOMÁTICOS
       */
      product.forn_id = supplier;
      product.prod_gtin = "SEM GTIN";

      const rowNumber = index + 3;

      Object.entries(columns).forEach(([key, column]) => {
        const value = product[key];

        worksheet.getCell(rowNumber, column).value =
          value !== undefined ? value : "";
      });
    });

    console.log("Primeiro produto:");
    console.log(products[0]);

    console.log("Teste célula B3:");
    console.log(worksheet.getCell(3, 2).value);

    /**
     * GARANTIR PASTA GENERATED
     */
    const generatedDir = path.resolve("generated");

    if (!fs.existsSync(generatedDir)) {
      fs.mkdirSync(generatedDir);
    }

    /**
     * NOME DO ARQUIVO
     */
    const safeSupplier = supplier.replace(/[^a-zA-Z0-9-_]/g, "_");

    const fileName = `${safeSupplier}.xlsx`;

    const outputPath = path.resolve(generatedDir, fileName);

    /**
     * GERAR XLSX
     */
    await workbook.xlsx.writeFile(outputPath);

    /**
     * DOWNLOAD
     */
    return res.download(outputPath, fileName);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao gerar XLSX",
    });
  }
});

app.listen(3001, () => {
  console.log("API rodando na porta 3001");
});
