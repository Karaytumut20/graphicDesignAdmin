import { Request, Response } from "express";
import { IncomingForm, File } from "formidable";
import fs from "fs";

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
    multiples: true,
    keepExtensions: true,
    uploadDir: "public/images/afis", // Dosyaların kaydedileceği dizin
  });

  form.parse(req, (err: any, fields: any, files: any) => {
    if (err) {
      console.error("Error parsing form data:", err);
      return res.status(500).send("Error parsing form data");
    }

    // Dosyaları işle
    // @ts-ignore
    const filePromises = Object.values(files).map((file: File) => {
      // @ts-ignore
      const { path, name } = file;
      // Dosyanın yeni adı, kaydedileceği dizin ile birleştirilerek belirlenir
      const newFilePath = `${form.uploadDir}/${name}`;
      // Dosya taşınırken yeniden adlandırılıyor ve taşınıyor
      fs.renameSync(path, newFilePath);

      return Promise.resolve();
    });

    Promise.all(filePromises)
      .then(() => {
        res.status(200).send("Files uploaded successfully");
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
        res.status(500).send("Error uploading files");
      });
  });
}
