import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {HexColorPicker} from 'react-colorful';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {styled} from '@mui/material/styles';
import axios from 'axios'; // Axios'u import ediyoruz
// @ts-ignore
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
    const [date, setDate] = useState<any>();
    const [image, setImage] = useState<any>();
    const [logo, setLogo] = useState<any>();
    const [logoUpload, setLogoUpload] = useState<any>();
    const [imageUpload, setImageUpload] = useState<any>();
    const handleDateChange = (newDate: any) => {
        setDate(newDate);
    };

    const handleDropLogo = (acceptedFiles: any) => {
        const file = acceptedFiles[0];
        setLogoUpload(acceptedFiles);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setLogo(reader.result); // Dosyanın önizleme görüntüsünü almak için blob kullanılır.
            };
            reader.readAsDataURL(file); // Blob'u almak için kullanılan asenkron bir işlem.
        }
    };

    const handleDrop = (acceptedFiles: any) => {
        const file = acceptedFiles[0];
        setImageUpload(acceptedFiles);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result); // Dosyanın önizleme görüntüsünü almak için blob kullanılır.
            };
            reader.readAsDataURL(file); // Blob'u almak için kullanılan asenkron bir işlem.
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // Post isteğini oluştur
        try {

            const body = {
                title,
                date: date ? date?.format('YYYY-MM-DD') : '',
                textColor,
                image: imageUpload,
                logo: logoUpload
            };
            console.log('body:', body);

            // Axios ile post isteği gönde
            const response = await axios.post('http://localhost:3000/api/category', body);

            console.log('Post işlemi başarılı:', response.data);
        } catch (error) {
            console.error('Post işlemi sırasında hata oluştu:', error);
        }
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
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon/>}>
                    Logo Yükle
                    <VisuallyHiddenInput type="file" onChange={(e) => handleDropLogo(e.target.files)}/>
                </Button>
                {logo && (
                    <div className="imageContainer">
                        <img src={logo} alt="Dropped Image" className="image"/>
                    </div>
                )}
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
                <div style={{display: 'flex', width: '100%'}}>
                    <HexColorPicker className="mt-3" color={textColor} onChange={setTextColor} style={{width: '100%'}}/>
                </div>
                {image && (
                    <div className="imageContainer">
                        <img src={image} width={300} height={500} alt="Dropped Image" className="image"/>
                    </div>
                )}
                <Button variant="contained" type="submit">
                    Gönder
                </Button>
            </Stack>
        </form>
    );
}
