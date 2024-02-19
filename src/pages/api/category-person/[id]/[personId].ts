import {connectToDatabase} from "../../../../@core/db";
// @ts-ignore
import {NextApiHandler} from "next";
import fs from "fs";

const handler: NextApiHandler = async (req: any, res: any) => {
    const {id, personId} = req.query;
    try {
        if (req.method === 'GET') {
            const db = await connectToDatabase();
            const [categories] = await db.query('SELECT * FROM category WHERE id=?', [id]);
            res.status(200).json(categories);
        } else if (req.method === 'PUT') {
            const db = await connectToDatabase();
            const {title, font_color, date} = req.body;
            const [categories] = await db.query('UPDATE category SET title=?, font_color=?, date=? WHERE id=?', [title, font_color, date, id]);
            res.status(200).json(categories);
        } else if (req.method === 'DELETE') {
            const db = await connectToDatabase();
            const [categoryPersons]: any = await db.query('SELECT * FROM category_person WHERE category_id=? AND person_id=?', [id, personId]);
            if (categoryPersons.length === 0) {
                res.status(404).json({error: "Category person not found"});
                return;
            }
            try {
                await db.query('DELETE FROM category_person WHERE category_id=? AND person_id=?', [id, personId]);
                res.status(200).json({message: "Category person deleted successfully"});
            } catch (error) {
                console.error("Category person delete error:", error);
                res.status(500).json({error: "Internal Server Error"});
            }
        } else {
            res.status(405).json({error: "Method Not Allowed"});
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({error: "Internal server error"});
    }
}

export default handler;
