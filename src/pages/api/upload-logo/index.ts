import { Request, Response } from "express";
import { IncomingForm, File } from "formidable";
import fs from "fs";
import { connectToDatabase } from "../../../@core/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function uploadFormFiles(
  req: Request,
  res: Response
) {
  // @ts-ignore
  const form: any = new IncomingForm({
    multiples: false,
    keepExtensions: true,
    uploadDir: "public/images/logo", // Dosyaların kaydedileceği dizin
  });

  form.parse(req, async (err: any, fields: any, files: any) => {
    if (err) {
      console.error("Error parsing form data:", err);
      return res.status(500).send("Error parsing form data");
    }


    const { id } = fields; // İstekten ID'yi al


    if (!files) {
      return res.status(400).send("No file uploaded");
    }


    const { filepath, newFilename } = files.file[0]; // Dosya yolunu ve adını al

    // Dosyanın yeni adı, kaydedileceği dizin ile birleştirilerek belirlenir

    const newFilePath = `public/images/logo/${newFilename}`;

    try {

      // Dosya taşınırken yeniden adlandırılıyor ve taşınıyor
      fs.renameSync(filepath, newFilePath)
      const filePathNew = newFilePath.toString().replace("public", "");

      const db = await connectToDatabase();
      const [result]: any = await db.query('UPDATE category SET logo = ? WHERE id = ?', [filePathNew.toString(), id]);

      res.status(200).send("File uploaded and category updated successfully");
    } catch (error) {
      console.error("Error processing file:", error);
      res.status(500).send("Error processing file");
    }
  });
}
