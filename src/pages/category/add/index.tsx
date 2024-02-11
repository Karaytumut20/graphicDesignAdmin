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
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

interface Props {
  dirs: string[];
}
// @ts-ignore
import styles from './Home.module.css';
// @ts-ignore
import {GetServerSideProps, NextPage} from "next";

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

const Add: NextPage<Props> = ({ dirs }) => {
  const [textColor, setTextColor] = useState("#aabbcc");
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<any>();
  const [image, setImage] = useState<any>();
  const [logo, setLogo] = useState<any>();
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleDateChange = (newDate: any) => {
    setDate(newDate);
  };


  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("logo", selectedFile);
      const {data} = await axios.post("/api/image", formData);
      console.log(data);
    } catch (error: any) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Post isteğini oluştur
    try {

      if (!selectedFile) return;
      const formData: FormData = new FormData();



      formData.set("logo", selectedFile);
      formData.set("title", title);
      formData.set("date", date?.format('YYYY-MM-DD'));
      formData.set("textColor", textColor);
      formData.set("image", image); // Değiştirildi


      // Axios ile post isteği gönde
      const response = await axios.post('/api/category', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // FormData olduğunu belirtmek için gerekli
        },
      });

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
        <div className="max-w-4xl mx-auto p-20 space-y-6">
          <label>
            <input
              type="file"
              hidden
              onChange={({target}) => {
                if (target.files) {
                  const file = target.files[0];
                  setSelectedImage(URL.createObjectURL(file));
                  setSelectedFile(file);
                }
              }}
            />
            <div
              className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
              {selectedImage ? (
                <img src={selectedImage} alt=""/>
              ) : (
                <span>Select Image</span>
              )}
            </div>
          </label>
          <div className="mt-20 flex flex-col space-y-3">
            {dirs.map((item) => (
              <Link key={item} href={"/images/" + item}>
                <a className="text-blue-500 hover:underline">{item}</a>
              </Link>
            ))}
          </div>
        </div>


        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="mt-3"
            label="Tarih"
            value={date}
            onChange={handleDateChange}
          />
        </LocalizationProvider>

        <div style={{display: 'flex', width: '100%'}}>
          <HexColorPicker className="mt-3" color={textColor} onChange={setTextColor} style={{width: '100%'}}/>
        </div>
        <Button variant="contained" type="submit">
          Gönder
        </Button>
      </Stack>
    </form>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const props = { dirs: [] };
  try {
    const dirs = await fs.readdir(path.join(process.cwd(), "/public/images/logo"));
    props.dirs = dirs as any;
    return { props };
  } catch (error) {
    return { props };
  }
};
export default Add;
