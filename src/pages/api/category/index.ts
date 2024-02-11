import { connectToDatabase } from "../../../@core/db";
// @ts-ignore
import { NextApiHandler } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const checkAndCreateFolder = async (folderPath: string) => {
  try {
    await fs.access(folderPath);
  } catch (error) {
    await fs.mkdir(folderPath, { recursive: true });
  }
};

const handler: NextApiHandler = async (req: any, res: any) => {
  try {
    if (req.method === 'GET') {
      const db = await connectToDatabase();
      const [categories] = await db.query('SELECT * FROM category');
      res.status(200).json(categories);
    } else if (req.method === 'POST') {
      // FormData'dan gelen verilerin parse edilmesi
      const formData: any = await new formidable.IncomingForm().parse(req);
      const { title, logo, image, textColor, date } = formData.fields;

      // Veritabanına ekleme işlemi
      const db = await connectToDatabase();
      const [categories] = await db.query('INSERT INTO category (title, logo, image, font_color, date) VALUES (?, ?, ?, ?, ?)', [title, logo, image, textColor, date]);

      // Klasör kontrolü ve dosya okuma işlemi
      await checkAndCreateFolder(path.join(process.cwd(), "/public/images"));
      // Dosyaların yüklenmesi vs. buraya eklenebilir

      res.status(200).json(categories);
    } else if (req.method === 'PUT') {
      const db = await connectToDatabase();
      const { id, title, logo, image, font_color, date } = req.body;
      const [categories] = await db.query('UPDATE category SET title=?, logo=?, image=?, font_color=?, date=? WHERE id=?', [title, logo, image, font_color, date, id]);
      res.status(200).json(categories);
    } else if (req.method === 'DELETE') {
      const db = await connectToDatabase();
      const { id } = req.body;
      const [categories] = await db.query('DELETE FROM category WHERE id=?', [id]);
      res.status(200).json(categories);
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default handler;
