import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { HexColorPicker } from "react-colorful";
import dayjs from 'dayjs'; // Import dayjs library
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Dropzone from 'react-dropzone'; // Import Dropzone component
import styles from './Home.module.css'; // Assuming you have a CSS file for styles

export default function Add() {
  const [textColor, setColor] = useState("#aabbcc");
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(null); // Initialize date state
  const [image, setImage] = useState(null); // Initialize image state
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Başlık:', title);
    console.log('Tarih:', date ? date.format('YYYY-MM-DD') : null); // Format date if it's not null
    console.log('Yazı Rengi:', textColor);
    console.log('Resim:', image);
    console.log('Text 1:', text1);
    console.log('Text 2:', text2);
    console.log('Text 3:', text3);
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

        {/* Add DatePicker component */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Tarih"
            value={date}
            onChange={(newDate) => handleDateChange(newDate)}
          />
        </LocalizationProvider>
        
        <HexColorPicker color={textColor} onChange={setColor} />

        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()} className={styles.dropzone}>
                <input {...getInputProps()} />
                <p>Drag & drop an image here, or click to select one</p>
              </div>
            </section>
          )}
        </Dropzone>
        
        {image && (
          <div className={styles.imageContainer}>
            <img src={image} alt="Dropped Image" className={styles.image} />
            {title && (
              <div className={styles.titleInsideImage}>
                <p>{title}</p>
              </div>
            )}
            {date && (
              <div className={styles.dateInsideImage}>
                <p>{date.format('YYYY-MM-DD')}</p>
              </div>
            )}
            {text1 && (
              <div className={styles.textInsideImage1}>
                <p>{text1}</p>
              </div>
            )}
            {text2 && (
              <div className={styles.textInsideImage2}>
                <p>{text2}</p>
              </div>
            )}
            {text3 && (
              <div className={styles.textInsideImage3}>
                <p>{text3}</p>
              </div>
            )}
          </div>
        )}

        <Button variant="contained" type="submit">
          Gönder
        </Button>
      </Stack>
    </form>
  );
}
