import { connectToDatabase } from "../../../@core/db";

const handler = async (req: any, res: any) => {
  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const db = await connectToDatabase();
      const [persons] = await db.query('SELECT * FROM person WHERE ID = ?', [id]);
      res.status(200).json(persons);
    } else if (req.method === 'PUT') {
      const db = await connectToDatabase();
      const { name, surname, degree, phone, website } = req.body; // Düzeltme: request body'den doğru alanları al
      const [updatedPerson] = await db.query('UPDATE person SET name=?, surname=?, degree=?, phone=?, website=? WHERE id=?', [name, surname, degree, phone, website, id]); // Düzeltme: SET alanlarını ve parametreleri doğru sırayla kullan
      res.status(200).json(updatedPerson); // Düzeltme: güncellenmiş kişiyi yanıt olarak gönder
    } else if (req.method === 'DELETE') {
      const db = await connectToDatabase();
      const [person]: any[] = await db.query('SELECT * FROM person WHERE id=?', [id]);

      if (person.length === 0) {
        res.status(404).json({ error: "person not found" });
        return;
      }

      try {
        await db.query('DELETE FROM person WHERE id=?', [id]);
        await db.query('DELETE FROM category_person WHERE person_id=?', [id])
        res.status(200).json({ message: "person deleted successfully" });
      } catch (error) {
        console.error("Kullanıcıyı veritabanından silme hatası:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default handler;
