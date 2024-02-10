import {connectToDatabase} from "../../../@core/db";

import fs from 'fs';
import path from 'path';
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

const handler = async (req: any, res: any) => {

    if (req.method === 'GET') {
        const db = await connectToDatabase();
        const [categories] = await db.query('SELECT * FROM category');
        res.status(200).json(categories);
    }else if(req.method === 'POST') {
        const {title, logo, image, textColor, date} = req.body;
        return res.status(200).json({data: req.body});

        const db = await connectToDatabase();

        const [categories] =
            await db.query('INSERT INTO category (title,logo,image,font_color,date) VALUES (?)', [title,logo,image,textColor,date]);
        res.status(200).json(categories);
    }else if(req.method === 'PUT') {
        const db = await connectToDatabase();
        const {id, title, logo, image, font_color, date} = req.body;
        const [categories] =
            await db.query('UPDATE category SET title=?,logo=?,image=?,font_color=?,date=? WHERE id=?', [title, logo, image, font_color, date, id]);
        res.status(200).json(categories);
    }else if(req.method === 'DELETE') {
        const db = await connectToDatabase();
        const {id} = req.body;
        const [categories] =
            await db.query('DELETE FROM category WHERE id=?', [id]);
        res.status(200).json(categories);
    }

}

export default handler;
