import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: '24px',
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Person() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [data, setData] = useState([]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/person');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDeleteClick = async (id: number) => {
    try {
      await axios.delete(`/api/person/${id}`);
      const newData = data.filter((item: any) => item.id !== id);
      setData(newData);
      setModalOpen(false);
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  const handleEditClick = (id: number) => {
    router.push(`/person/edit/${id}`);
  };

  const handleButtonClick = () => {
    router.push('/person/add');
  };

  const handleDeleteIconClick = (id: number) => {
    setDeleteItemId(id);
    handleModalOpen();
  };

  return (
    <div>
      <h1>Kullanıcı Yönetimi</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Ad</TableCell>
              <TableCell align="center">Soyad</TableCell>
              <TableCell align="center">Ünvan</TableCell>
              <TableCell align="center">Telefon</TableCell>
              <TableCell align="center">Web Sitesi</TableCell>
              <TableCell align="center">Düzenle</TableCell>
              <TableCell align="center">Sil</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.surname}</TableCell>
                <TableCell align="center">{item.degree}</TableCell>
                <TableCell align="center">{item.phone}</TableCell>
                <TableCell align="center">{item.website}</TableCell>
                <TableCell align="center">
                  <EditIcon onClick={() => handleEditClick(item.id)} style={{ cursor: 'pointer' }} />
                </TableCell>
                <TableCell align="center">
                  <DeleteIcon onClick={() => handleDeleteIconClick(item.id)} style={{ cursor: 'pointer' }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} direction="row">
        <Button className='mt-4' sx={{ width: "100%" }} variant="contained" onClick={handleButtonClick}>
          Ekle
        </Button>
      </Stack>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <Box sx={modalStyle}>
          <h2 id="delete-modal-title">Kullanıcıyı Sil</h2>
          <p id="delete-modal-description">
            Kullanıcıyı silmek istediğinize emin misiniz?
          </p>
          <Stack direction="row" spacing={2}>
            <Button onClick={handleModalClose}>Vazgeç</Button>
            <Button onClick={() => handleDeleteClick(deleteItemId)}>Sil</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
