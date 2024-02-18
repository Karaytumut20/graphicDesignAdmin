import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const EditPerson = (props: { id: any }) => {
  const { id } = props;
  const router = useRouter();
  const [data, setData] = useState<any>({});
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [degree, setDegree] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/person/${id}`);
          setData(response.data[0]);
          setName(response.data[0].name);
          setSurname(response.data[0].surname);
          setDegree(response.data[0].degree);
          setPhone(response.data[0].phone);
          setWebsite(response.data[0].website);
        } catch (error) {
          console.error("Veri getirme sırasında hata oluştu:", error);
        }
      };

      fetchData();
    }
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formBody = {
        name: name,
        surname: surname,
        degree: degree,
        phone: phone,
        website: website,
      };

      const response = await axios.put(`/api/person/${id}`, formBody);

      if (response.status === 200) {
        router.push("/person"); // Başarıyla güncellendiğinde /person sayfasına yönlendir
      }
    } catch (error) {
      console.error("Güncelleme sırasında hata oluştu:", error);
    }
  };

  return data && (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} direction="column">
        <TextField
          className="mt-3 mb-1"
          label="Ad"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className="mt-3 mb-1"
          label="Soyad"
          variant="outlined"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <TextField
          className="mt-3 mb-1"
          label="Ünvan"
          variant="outlined"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        />
        <TextField
          className="mt-3 mb-1"
          label="Telefon"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          className="mt-3 mb-1"
          label="Website"
          variant="outlined"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
    
        <Button variant="contained" type="submit" fullWidth>
          Gönder
        </Button>
      </Stack>
    </form>
  );
};

export const getServerSideProps = async (context: any) => {
    const { id } = context.query;
  
    return {
      props: {
        id,
      },
    };
  };

export default EditPerson;
