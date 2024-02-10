import * as React from 'react';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router'; // Next.js'in router'ını içe aktarın
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
import CustomBadge from "../../@core/components/CustomBadge";
import axios from 'axios';

const createData = (
  name: string,
  color: string, // Renk bilgisini içeren bir prop
  id: number // Öğe id'si
) => {
  return { name, color, id };
}

const items = [
  { id: 1, name: 'Frozen yoghurt', color: 'secondary' },
  { id: 2, name: 'Ice cream sandwich', color: 'success' },
  { id: 3, name: 'Eclair', color: 'info' },
  { id: 4, name: 'Cupcake', color: 'warning' },
  { id: 5, name: 'Gingerbread', color: 'error' }
];

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
  const router = useRouter(); // Next.js'in router'ını al
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await axios.get('http://localhost:3000/api/category');
      setData(response.data)
    }

    fetchData();
  }, []);


  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDeleteClick = (id: number) => {
    // Silme işlevi burada gerçekleştirilebilir
    console.log('Delete clicked for id:', id);
    handleModalOpen(); // Modalı aç
  };

  const handleEditClick = (id: number) => {
    router.push(`category/edit/${id}`); // '/edit/[id]' rotasına yönlendir
  };

  const handleButtonClick = () => {
    router.push('/category/add'); // '/add' rotasına yönlendir
  };
  const getDate = (date: any) => {

    const dateObject = new Date(date); // Tarih dizesini bir tarih nesnesine dönüştürme

    const year = dateObject.getFullYear(); // Yılı al
    const month = dateObject.getMonth() + 1; // Ayı al (0-11 arasında olduğu için 1 eklenir)
    const day = dateObject.getDate(); // Günü al

    return `${year}/${month}/${day}`
  }

  return (
    <div>
        <h1>Kategori Yönetimi</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
                <TableCell>Başlık</TableCell>
              <TableCell>Fotoğraf</TableCell>
              <TableCell align="right">Logo</TableCell>
              <TableCell align="right">Tarih</TableCell>
              <TableCell align="right">Renk</TableCell>
              <TableCell align="right">Düzenle</TableCell>
              <TableCell align="right">Sil</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item: any) => (
              <TableRow
                key={item.id} // ID kullanıldı
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.title}
                </TableCell>
                <TableCell align="right">
                  <img src={item.image} alt='' width="100" />
                </TableCell>
                <TableCell align="right">{/* Burada diğer özellikler eklenebilir, ancak bu veriler items dizisinde mevcut değil */}</TableCell>
                <TableCell align="right">{getDate(item.date)}</TableCell>
                <TableCell align="right">
                  <CustomBadge  color={item.color}></CustomBadge>
                </TableCell>


                <TableCell align="right">
                  <EditIcon onClick={() => handleEditClick(item.id)} style={{ cursor: 'pointer' }} /> {/* Düzenleme için handleEditClick fonksiyonu çağrıldı */}
                </TableCell>
                <TableCell align="right">
                  <DeleteIcon onClick={() => handleDeleteClick(item.id)} style={{ cursor: 'pointer' }} /> {/* Silme için handleDeleteClick fonksiyonu çağrıldı */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} direction="row">
        {/* Butona tıklandığında handleButtonClick fonksiyonunu çağır */}
        <Button variant="contained" onClick={handleButtonClick}>
          Contained
        </Button>
      </Stack>
      {/* Silme modalı */}
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
          <Button onClick={handleModalClose}>Sil</Button>
        </Box>
      </Modal>
    </div>
  );
}
