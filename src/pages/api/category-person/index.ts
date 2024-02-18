import {connectToDatabase} from "../../../@core/db";


const handler = async (req: any, res: any) => {
  try {
    if (req.method === 'GET') {
      const db = await connectToDatabase();
      const [persons]: any = await db.query('SELECT * FROM person')
      const [categories]: any = await db.query('SELECT * FROM category')
      const [categoryPersons]: any = await db.query('SELECT * FROM category_person')

      const newPersonData = persons.map((person: any) => {
        const categoryPerson = categoryPersons.filter((categoryPerson: any) => categoryPerson.person_id === person.id);
        const categoryPersonId = categoryPerson.map((categoryPerson: any) => categoryPerson.category_id);
        const category = categories.filter((category: any) => categoryPersonId.includes(category.id));
        return {
          ...person,
          category: category
        }
      })
      res.status(200).json({
        newPersonData,
        categories
      });
    } else if (req.method === 'POST') {
      let result;
      const {categoryIds, personIds} = req.body;
      const db = await connectToDatabase();

      for (let i = 0; i < categoryIds.length; i++) {
        for (let j = 0; j < personIds.length; j++) {
          const [categoryPerson]: any = await db.query('SELECT * FROM category_person WHERE category_id = ? AND person_id = ?', [categoryIds[i], personIds[j]]);
          if (categoryPerson.length > 0) {
            continue;
          }
          result = await db.query('INSERT INTO category_person (category_id,person_id) VALUES (?, ?)', [categoryIds[i], personIds[j]]);
        }
      }
      res.status(200).json(result);
    } else {
      res.status(405).json({error: "Method Not Allowed"});
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({error: "Internal server error"});
  }
}

export default handler;
