import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {HexColorPicker} from "react-colorful";
import dayjs from 'dayjs'; // Import dayjs library
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import Dropzone from 'react-dropzone'; // Import Dropzone component
// @ts-ignore
import styles from './Home.module.css'; // Assuming you have a CSS file for styles
import {Label} from 'mdi-material-ui';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Add() {
  const [textColor, setColor] = useState("#aabbcc");
  const [title, setTitle] = useState('');
  const [logo, setLogo] = useState<any>('');
  const [date, setDate] = useState<any>(); // Initialize date state
  const [image, setImage] = useState(); // Initialize image state
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');

  const handleDateChange = (newDate: any) => {
    setDate(newDate);
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleLogoChange = (e: any) => {
    console.log(e.target.value)
    const file = e.target.files[0];
    console.log(file)
    setLogo(file);

  };

  const handleDrop = async (acceptedFiles: any) => {
    console.log(acceptedFiles)
    const file = acceptedFiles[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // @ts-ignore
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('Başlık:', title);

    console.log('Tarih:', date ? date.format('YYYY-MM-DD') : null);

    console.log('Yazı Rengi:', textColor);
    console.log('Resim:', image);
    console.log('Text 1:', text1);
    console.log('Text 2:', text2);
    console.log('Text 3:', text3);

    // Logo dosyasını kaydet
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} direction="column">

        <TextField
          className="mt-3"
          label="Başlık"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '100%',
          width: '100%',
        }}>
          <Typography>
            Logo
          </Typography>
          <TextField
            className="mt-3"
            label="Logo"
            type="file"
            variant="standard"
            onChange={handleLogoChange}
          />
        </Box>


        {/* Add DatePicker component */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="mt-3"
            label="Tarih"
            value={date}
            onChange={(newDate) => handleDateChange(newDate)}
          />
        </LocalizationProvider>


        <HexColorPicker className="mt-3" color={textColor} onChange={setColor}/>

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

        {image && (
          <div className={styles.imageContainer}>
            <img src={image} alt="Dropped Image" className={styles.image}/>
            {
              logo && (
                <img src={logo} alt="Selected Logo" className={styles.logo}/>
              )
            }
            {title && (
              <div className={styles.titleInsideImage}>
                <p>{title}</p>
              </div>
            )}
            {date && (
              <div className={styles.dateInsideImage}>
                <p>{date?.format('YYYY-MM-DD')}</p>
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
