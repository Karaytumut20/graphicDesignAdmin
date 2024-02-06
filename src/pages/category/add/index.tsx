import React, {useState} from 'react'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { HexColorPicker } from "react-colorful";
export default function Add() {
  const [textColor, setColor] = useState("#aabbcc");
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<any>();
  const [image, setImage] = useState('');

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Form verilerini bir API'ye gönderme işlemleri burada gerçekleştirilebilir
    console.log('Başlık:', title);
    console.log('Tarih:', date);
    console.log('Yazı Rengi:', textColor);
    console.log('Resim:', image);

  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} direction="column">
        <TextField
          label="Başlık"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <HexColorPicker color={textColor} onChange={setColor} />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <Button variant="contained" type="submit">
          Gönder
        </Button>
      </Stack>
    </form>
  );
}
