import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { HexColorPicker } from "react-colorful";
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const EditCategory = (props: { id: any }) => {
  const { id } = props;
  const router = useRouter();
  const [data, setData] = useState<any>({});
  const [textColor, setTextColor] = useState("");
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<any>();
  const [file, setFile] = useState<any>(); //logo

  function handleFileChange(event: any) {
    setFile(event.target.files);
  }

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const response = await axios.get(`/api/category/${id}`);
        setData(response.data[0]);
        setDate(formatDate(response.data[0].date)); // Use formatDate function here
        setTitle(response.data[0].title);
        setTextColor(response.data[0].font_color);
      };

      fetchData();
    }
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Post isteğini oluştur
    try {
      const data = {
        title: title,
        date: date,
        textColor: textColor,
      };

      // Axios ile post isteği gönde
      const response = await axios.put("/api/category/"+id, data);
      console.log(response);

      if (response.status === 200 && response.data.id && file) {
        const body = new FormData();

        body.append("file", file[0]);
        body.append("id", id);

        fetch("/api/upload", {
          method: "POST",
          body,
        })
          .then((response) => {
            // Handle response
            router.push("/category");
          })
          .catch((error) => {
            // Handle error
            console.error("Upload failed:", error);
          });
      }
    } catch (error) {
      console.error("Post işlemi sırasında hata oluştu:", error);
    }
  };

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  return data && (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} direction="column">
        <TextField
          className="mt-3 mb-1"
          label="Başlık"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="max-w-4xl mx-auto p-20 space-y-6">
          <label htmlFor="file-upload">
            <input
              style={{ display: 'none' }}
              id="file-upload"
              name="file-upload"
              type="file"
              onChange={handleFileChange}
            />
            <Button
              variant="outlined"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Afiş Yükle
            </Button>
          </label>
        </div>

        {date && (
          <TextField
            className="mt-3"
            label="Tarih"
            type="date"
            variant="outlined"
            value={date} // Display date as text
            onChange={(e) => setDate(e.target.value)} // Handle manual date input
          />
        )}

        <div style={{ display: "flex", width: "100%" }}>
          <HexColorPicker
            className="mt-3"
            color={textColor}
            onChange={setTextColor}
            style={{ width: "100%" }}
          />
        </div>
        {data && data.image && (
          <img src={`${data.image}`} alt="Afiş" height={400} width={300}/>
        )}
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

export default EditCategory;
