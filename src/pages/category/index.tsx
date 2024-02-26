import * as React from 'react';
import { useEffect, useState } from 'react';
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
import { useRouter } from 'next/router';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const createData = (
  name: string,
  color: string, // Renk bilgisini içeren bir prop
  id: number // Öğe id'si
) => {
  return { name, color, id };
}

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
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await axios.get('http://localhost:3000/api/category');
      setData(response.data)
      console.log(response.data)
    }

    fetchData();
  }, []);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const confirmDelete = async () => {
    try {
      const response: any = await axios.delete(`http://localhost:3000/api/category/${selectedRowId}`);
      console.log(response)
      if (response.status === 200) {
        setModalOpen(false);
        const newData = data.filter((item: any) => item.id !== selectedRowId);
        setData(newData);
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteClick = (id: number) => {
    setSelectedRowId(id); // Seçili satırın kimliğini ayarla
    handleModalOpen(); // Modalı aç
  };

  const handleEditClick = (id: number) => {
    router.push(`category/edit/${id}`); // '/edit/[id]' rotasına yönlendir
  };

  const handleButtonClick = () => {
    router.push('/category/add'); // '/add' rotasına yönlendir
  };

  const handleZoomInClick = (id: number) => {
    router.push(`/category/details/${id}`); // '/details/[id]' rotasına yönlendir
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
              <TableCell align="center">Başlık</TableCell>
              <TableCell align="center">Afiş</TableCell>
              <TableCell align="center">Logo</TableCell>
              <TableCell align="center">Tarih</TableCell>
              <TableCell align="center">Düzenle</TableCell>
              <TableCell align="center">Sil</TableCell>
              <TableCell align="center">Detay</TableCell> {/* Detay sütunu eklendi */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item: any) => (
              <TableRow
                key={item.id} // ID kullanıldı
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center' component="th" scope="row">
                  {item.title}
                </TableCell>
                <TableCell align="center">
                  {item.image ? <img src={item.image} alt="" height={100} width={100} /> :
                    <div className="alert alert-warning">Görsel Yok</div>
                  }
                </TableCell>
                <TableCell align="center">
                  {item.logo ? <img src={item.logo} alt="" height={100} width={100} /> :
                    <button className={'btn btn-success'} onClick={() => router.push('/upload-logo/' + item.id)}>Logo Yükle</button>
                  }
                </TableCell>
                <TableCell align="center">{getDate(item.date)}</TableCell>
                <TableCell align="center">
                  <EditIcon onClick={() => handleEditClick(item.id)} style={{ cursor: 'pointer' }} />
                </TableCell>
                <TableCell align="center">
                  <DeleteIcon onClick={() => handleDeleteClick(item.id)} style={{ cursor: 'pointer' }} />
                </TableCell>
                <TableCell align="center">
                  <ZoomInIcon onClick={() => handleZoomInClick(item.id)} style={{ cursor: 'pointer' }} />
                </TableCell> {/* Detay ikonu eklendi */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} direction="row">
        <Button
          className='mt-4'
          variant="contained"
          onClick={handleButtonClick}
          sx={{ width: "100%" }}
        >
          Ekle
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
          <Button onClick={() => confirmDelete()}>Sil</Button>
        </Box>
      </Modal>
    </div>
  );
}
