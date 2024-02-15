// pages/user/add.jsx

import React, { useState } from 'react';
import { CardContent, Grid, TextField, Button } from '@mui/material';
import axios from 'axios';

const UserAdd = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [degree, setDegree] = useState('')
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: name,
        degree: degree,
        surname: surname,
        phone: phone,
        website: website
      };

      const response = await axios.post('/api/person', data);
      console.log(response.data);

      setName('');
      setTitle('');
      setPhone('');
      setSite('');
    } catch (error) {
      console.error('Error occurred during POST request:', error);
      alert('Bir hata oluştu, lütfen daha sonra tekrar deneyin.');
    }
  };

  return (
    <CardContent>
      <h1>Kullanıcı Ekle</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='İsim Soyisim' value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Ünvan' value={title} onChange={(e) => setTitle(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Telefon' value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Site' value={site} onChange={(e) => setSite(e.target.value)} />
          </Grid>

          <Grid item xs={12}>
            <Button variant='contained' type='submit' sx={{ marginRight: 3.5 }}>
              Kaydet
            </Button>
            <Button type='reset' variant='outlined' color='secondary' onClick={() => {
              setName('');
              setTitle('');
              setPhone('');
              setSite('');
            }}>
              Sıfırla
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};

export default UserAdd;
