import {Request, Response} from "express";
import {IncomingForm, File} from "formidable";
import fs from "fs";
import {connectToDatabase} from "../../../@core/db";

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
    uploadDir: "public/images/afis", // Dosyaların kaydedileceği dizin
  });

  form.parse(req, async (err: any, fields: any, files: any) => {
    if (err) {
      console.error("Error parsing form data:", err);
      return res.status(500).send("Error parsing form data");
    }

    if (!files) {
      return res.status(400).send("No file uploaded");
    }

    const db = await connectToDatabase();
    const {id} = fields; // İstekten ID'yi al
    const [categoryImage]: any = await db.query('SELECT * FROM category WHERE id=?', [id]);

    try {
      if (categoryImage[0].image && fs.existsSync(`public${categoryImage[0].image}`)) {
        // Resim dosyalarını sil
        const categoryImagePath = `public${categoryImage[0].image}`;
        await fs.promises.unlink(categoryImagePath);
      }
      const {filepath, newFilename} = files.file[0]; // Dosya yolunu ve adını al

      // Dosyanın yeni adı, kaydedileceği dizin ile birleştirilerek belirlenir

      const newFilePath = `public/images/afis/${newFilename}`;

      try {

        // Dosya taşınırken yeniden adlandırılıyor ve taşınıyor
        fs.renameSync(filepath, newFilePath)
        const filePathNew = newFilePath.toString().replace("public", "");


        const [result]: any = await db.query('UPDATE category SET image = ? WHERE id = ?', [filePathNew.toString(), id]);

        res.status(200).send("File uploaded and category updated successfully");
      } catch (error) {
        console.error("Error processing file:", error);
        res.status(500).send("Error processing file");
      }
    } catch (error) {
      // Hata durumunda uygun bir yanıt dön
      console.error("Resim dosyalarını silme hatası:", error);
      res.status(500).send("Internal Server Error");
      return;
    }


  });
}
