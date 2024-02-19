import { connectToDatabase } from "../../../@core/db";


const handler = async (req: any, res: any) => {
  try {
    if (req.method === 'GET') {
      const db = await connectToDatabase();
      const [persons] = await db.query('SELECT * FROM person')
      res.status(200).json(persons);
    } else if (req.method === 'POST') {
      const {name,surname,degree, phone, website, categoryIds} = req.body;
      const db = await connectToDatabase();
      const [result]: any = await db.query('INSERT INTO person (name,surname,degree, phone, website) VALUES (?, ?, ?, ?, ?)', [name, surname, degree ,phone, website]);

      if (categoryIds && categoryIds.length > 0) {
          const newPersonId = result.insertId;
          categoryIds.map((item: any) => {
            db.query('INSERT INTO category_person (category_id,person_id) VALUES (?, ?)', [item, newPersonId]);
          })
      }
      const insertedPersonId = result.insertId;
      res.status(200).json({ id: insertedPersonId });
    } else {
      res.status(405).json({error: "Method Not Allowed"});
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({error: "Internal server error"});
  }
}

export default handler;
