import {connectToDatabase} from "../../../@core/db";
// @ts-ignore
import {NextApiHandler} from "next";
import fs from "fs";

const handler: NextApiHandler = async (req: any, res: any) => {
  const { id } = req.query;
  try {
    if(req.method === 'GET') {
      const db = await connectToDatabase();
      const [categories] = await db.query('SELECT * FROM category WHERE id=?', [id]);
      res.status(200).json(categories);
    }
    else if (req.method === 'PUT') {
      const db = await connectToDatabase();
      const {title, logo, image, font_color, date} = req.body;
      const [categories] = await db.query('UPDATE category SET title=?, logo=?, image=?, font_color=?, date=? WHERE id=?', [title, logo, image, font_color, date, id]);
      res.status(200).json(categories);
    } else if (req.method === 'DELETE') {
      const db = await connectToDatabase();

      // İlgili kategoriyi veritabanından seç
      const [category]: any[] = await db.query('SELECT * FROM category WHERE id=?', [id]);

      // Kategori bulunamadıysa 404 hatası dön
      if (category.length === 0) {
        res.status(404).json({error: "Category not found"});
        return;
      }

      // Kategori bulunduysa, resim dosyalarını sil
      const categoryImagePath = `public${category[0].logo}`;
      const categoryPosterPath = `public${category[0].image}`;

      try {
        // Resim dosyalarını sil
        await fs.promises.unlink(categoryImagePath);
        await fs.promises.unlink(categoryPosterPath);
      } catch (error) {
        // Hata durumunda uygun bir yanıt dön
        console.error("Resim dosyalarını silme hatası:", error);
        res.status(500).json({error: "Internal Server Error"});
        return;
      }

      // Resim dosyaları başarıyla silindi, şimdi kategoriyi veritabanından sil
      try {
        await db.query('DELETE FROM category WHERE id=?', [id]);
        res.status(200).json({message: "Category deleted successfully"});
      } catch (error) {
        console.error("Kategoriyi veritabanından silme hatası:", error);
        res.status(500).json({error: "Internal Server Error"});
      }
    }
    else {
      res.status(405).json({error: "Method Not Allowed"});
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({error: "Internal server error"});
  }
}

export default handler;
