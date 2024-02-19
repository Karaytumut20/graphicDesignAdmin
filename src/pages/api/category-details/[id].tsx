import { connectToDatabase } from "../../../@core/db";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  try {
    const db = await connectToDatabase();
    const [category] = await db.query('SELECT * FROM category WHERE id = ?', [id]);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export default handler;
