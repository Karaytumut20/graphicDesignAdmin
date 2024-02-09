import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { HexColorPicker } from 'react-colorful';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import styles from './Home.module.css';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function Add() {
  const [textColor, setTextColor] = useState("#aabbcc");
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(null);
  const [image, setImage] = useState(null);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');

  const handleDateChange = (newDate) => {
    setDate(newDate);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Başlık:', title);
    console.log('Tarih:', date ? date.format('YYYY-MM-DD') : null);
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
          className="mt-3 mb-1"
          label="Başlık"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
              Logo Yükle
        <VisuallyHiddenInput type="file" onChange={(e) => handleDrop(e.target.files)} />
        </Button>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="mt-3"
            label="Tarih"
            value={date}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        <Dropzone onDrop={handleDrop}>
          {({getRootProps, getInputProps}) => (
            <section className="mt-5">
              <div {...getRootProps()} className={styles.dropzone}>
                <input {...getInputProps()} />
                <p>Drag & drop an image here, or click to select one</p>
              </div>
            </section>
          )}
        </Dropzone>
        <div style={{ display: 'flex', width: '100%' }}>
  <HexColorPicker className="mt-3" color={textColor} onChange={setTextColor} style={{ width: '100%' }} />
</div>
        {image && (
          <div className="imageContainer">
            <img src={image} alt="Dropped Image" className="image" />
            {title && (
              <div className="titleInsideImage">
                <p>{title}</p>
              </div>
            )}
            {date && (
              <div className="dateInsideImage">
                <p>{date.format('YYYY-MM-DD')}</p>
              </div>
            )}
            {text1 && (
              <div className="textInsideImage1">
                <p>{text1}</p>
              </div>
            )}
            {text2 && (
              <div className="textInsideImage2">
                <p>{text2}</p>
              </div>
            )}
            {text3 && (
              <div className="textInsideImage3">
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
