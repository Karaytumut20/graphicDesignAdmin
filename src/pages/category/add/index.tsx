import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Add() {
  const [title, setTitle] = React.useState('');
  const [date, setDate] = React.useState('');
  const [textColor, setTextColor] = React.useState('');
  const [image, setImage] = React.useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
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
        <TextField
          label="Tarih"
          type="date"
          variant="outlined"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          label="Yazı Rengi"
          variant="outlined"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <Button variant="contained" type="submit">
          Gönder
        </Button>
      </Stack>
    </form>
  );
}
