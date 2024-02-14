import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {HexColorPicker} from 'react-colorful';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import Dropzone from 'react-dropzone';
// @ts-ignore
import { Snackbar } from '@mui/joy';

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
import {useRouter} from "next/router";
import { Box } from 'mdi-material-ui';
import {SnackbarOrigin} from "@mui/material";

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
  const [file, setFile] = useState<any>();

  const {push} = useRouter();
  function handleFileChange(event:any) {
    setFile(event.target.files);
  }

  const handleDateChange = (newDate: any) => {
    setDate(newDate);
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Post isteğini oluştur
    try {

      const data = {
        title: title,
        date: date,
        textColor: textColor
      }

      // Axios ile post isteği gönde
      const response = await axios.post('/api/category', data);
      console.log(response.data.id)

      if(response.status === 200 && response.data.id && file){
        const body = new FormData();

        body.append('file', file[0]);
        body.append('id', response.data.id);

        fetch("/api/upload", {
          method: "POST",
          body
        })
          .then(response => {
            // Handle response
            console.log("Upload successful:", response);
          })
          .catch(error => {
            // Handle error
            console.error("Upload failed:", error);
          });

          push('/category');

      }

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
            <input type="file" onChange={handleFileChange} />
          </label>
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
