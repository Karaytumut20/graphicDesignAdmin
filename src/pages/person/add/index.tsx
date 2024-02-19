import React, {useEffect, useState} from 'react';
import {CardContent, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import axios from 'axios';
import {useRouter} from 'next/router';

const UserAdd = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [degree, setDegree] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const [categories, setCategories] = useState<any>([]); // State for categories, assuming it's an array of objects with keys ['id', 'name'
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<any>([]); // State for selected category IDs
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const data = {
                name: name,
                degree: degree,
                surname: surname,
                phone: phone,
                website: website,
                categoryIds: selectedCategoryIds // Assuming 'categories' is the key for selected category IDs in your data
            };

            const response = await axios.post('http://localhost:3000/api/person', data);

            if (response.status === 200) {
                router.push("/person");
            }

            // Reset form fields
            setName('');
            setSurname('');
            setPhone('');
            setDegree('');
            setWebsite('');
            setSelectedCategoryIds([]);
        } catch (error) {
            console.error('Error occurred during POST request:', error);
            alert('Bir hata oluştu, lütfen daha sonra tekrar deneyin.');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/category');
                if (response.status === 200) {
                    setCategories(response.data);
                }
            } catch (error) {
                console.error('Error occurred during GET request:', error);
                alert('Bir hata oluştu, lütfen daha sonra tekrar deneyin.');
            }
        };
        fetchData()
    }, []);

    return (
        <CardContent>
            <h1>Kullanıcı Ekle</h1>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label='İsim' value={name} onChange={(e) => setName(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label='Soy isim' value={surname}
                                   onChange={(e) => setSurname(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label='Ünvan' value={degree} onChange={(e) => setDegree(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label='Telefon' value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth label='Site' value={website} onChange={(e) => setWebsite(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id='form-layouts-separator-select-label'>Kategoriler</InputLabel>
                            <Select
                                value={selectedCategoryIds}
                                multiple
                                onChange={(e) => setSelectedCategoryIds(e.target.value)}
                                label='Country'
                                defaultValue=''
                                id='form-layouts-separator-select'
                                labelId='form-layouts-separator-select-label'
                            >
                                <MenuItem value='category1' disabled>Kategori Seçin</MenuItem>
                                {categories.map((category: any) => (
                                    <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained' type='submit' sx={{marginRight: 3.5}}>
                            Kaydet
                        </Button>
                        <Button type='reset' variant='outlined' color='secondary' onClick={() => {
                            setName('');
                            setSurname('');
                            setPhone('');
                            setDegree('');
                            setWebsite('');
                            setSelectedCategoryIds([]);
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
