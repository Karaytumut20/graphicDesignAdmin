import * as React from 'react';
import { useRouter } from 'next/router'; // Next.js'in router'ını içe aktarın
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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 37),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 67),
  createData('Gingerbread', 356, 16.0, 49),
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
  const [modalOpen, setModalOpen] = React.useState(false);
  
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDeleteClick = () => {
    // Silme işlevi burada gerçekleştirilebilir
    console.log('Delete clicked');
    handleModalOpen(); // Modalı aç
  };

  const handleButtonClick = () => {
    router.push('category/add'); // '/add' rotasına yönlendir
  };

  return (
    <div>
      <h1>Kullanıcı Yönetimi</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Ad Soyad</TableCell>
              <TableCell align="right">Ünvan</TableCell>
              <TableCell align="right">Telefon</TableCell>
              <TableCell align="right">Web Site</TableCell>
              <TableCell align="right">Düzenle</TableCell>
              <TableCell align="right">Sil</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">
                  <EditIcon onClick={() => console.log('Edit clicked')} style={{ cursor: 'pointer' }} />
                </TableCell>
                <TableCell align="right">
                  <DeleteIcon onClick={handleDeleteClick} style={{ cursor: 'pointer' }} />
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
