import {connectToDatabase} from "../../../@core/db";
// @ts-ignore
import {NextApiHandler} from "next";

const handler: NextApiHandler = async (req: any, res: any) => {
  try {
    if (req.method === 'GET') {
      const db = await connectToDatabase();
      const [categories] = await db.query('SELECT * FROM category');
      res.status(200).json(categories);
    } else if (req.method === 'POST') {
      const { title, textColor, date } = req.body;

      const dateObj = new Date(date);
      const formattedDate = dateObj.toISOString().slice(0, 19).replace('T', ' ');

      const db = await connectToDatabase();
      const [result]: any = await db.query('INSERT INTO category (title, logo, image, font_color, date) VALUES (?, ?, ?, ?, ?)', [title, null, null, textColor, formattedDate]);

      const insertedCategoryId = result.insertId; // Burada eklenen kategorinin ID'sini alıyoruz

      res.status(200).json({ id: insertedCategoryId }); // Frontend'e eklenen kategorinin ID'sini JSON olarak gönderiyoruz
  } else if (req.method === 'PUT') {
      const db = await connectToDatabase();
      const {id, title, logo, image, font_color, date} = req.body;
      const [categories] = await db.query('UPDATE category SET title=?, logo=?, image=?, font_color=?, date=? WHERE id=?', [title, logo, image, font_color, date, id]);
      res.status(200).json(categories);
    } else if (req.method === 'DELETE') {
      const db = await connectToDatabase();
      const {id} = req.body;
      const [categories] = await db.query('DELETE FROM category WHERE id=?', [id]);
      res.status(200).json(categories);
    } else {
      res.status(405).json({error: "Method Not Allowed"});
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({error: "Internal server error"});
  }
}

export default handler;
