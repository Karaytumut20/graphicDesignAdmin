import * as React from 'react';
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
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Category() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [data, setData] = React.useState([]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  React.useEffect(() => {
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

  const handleDeleteClick = (id) => {
    console.log('Delete clicked for id:', id);
    // Your delete logic here
  };

  const handleEditClick = (id) => {
    router.push(`person/edit/${id}`);
  };

  const handleButtonClick = () => {
    router.push('/user/add'); //gidilecek sayfa degısımı
  }; 

  return (
    <div>
      <h1>Kategori Yönetimi</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
          <TableRow>
              <TableCell>Ad </TableCell>
              <TableCell>Soyad</TableCell>
              <TableCell align="center">Ünvan</TableCell>
              <TableCell align="center">Telefon</TableCell>
              <TableCell align="center">Web Site</TableCell>
              <TableCell align="center">Düzenle</TableCell>
              <TableCell align="center">Sil</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.surname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.phone}
                </TableCell>
                <TableCell align="center">{item.website}</TableCell>
                <TableCell align="center">
                  <EditIcon
                    onClick={() => handleEditClick(item.id)}
                    style={{ cursor: 'pointer' }}
                  />
                </TableCell>
                <TableCell align="center">
                  <DeleteIcon
                    onClick={() => handleDeleteClick(item.id)}
                    style={{ cursor: 'pointer' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={handleButtonClick}>
          Contained
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
          <Button onClick={handleModalClose}>Vazgeç</Button>
          <Button onClick={() => handleDeleteClick()}>Sil</Button>
        </Box>
      </Modal>
    </div>
  );
}
