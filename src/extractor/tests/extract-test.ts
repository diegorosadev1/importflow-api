import { Router } from "express";
import multer from "multer";
import fs from "fs";

const pdfParse = require("pdf-parse");

const router = Router();

const upload = multer({
  dest: "uploads/",
});

router.post("/extract-test", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Arquivo não enviado",
      });
    }

    const dataBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(dataBuffer);

    return res.json({
      success: true,
      pages: pdfData.numpages,
      text: pdfData.text,
    });
  } catch (error: any) {
    console.log("ERRO PDF:");
    console.log(error);

    return res.status(500).json({
      error: error.message,
    });
  }
});

export default router;
