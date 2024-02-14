import {connectToDatabase} from "../../../@core/db";
// @ts-ignore
import {NextApiHandler} from "next";

const handler: NextApiHandler = async (req: any, res: any) => {
  const { id } = req.query;
  try {
    if (req.method === 'PUT') {
      const db = await connectToDatabase();
      const {title, logo, image, font_color, date} = req.body;
      const [categories] = await db.query('UPDATE category SET title=?, logo=?, image=?, font_color=?, date=? WHERE id=?', [title, logo, image, font_color, date, id]);
      res.status(200).json(categories);
    } else if (req.method === 'DELETE') {
      const db = await connectToDatabase();

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
