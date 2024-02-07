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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
) {
  return { name, calories, fat, carbs,  };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Category() {
  const router = useRouter(); // Next.js'in router'ını al

  const handleButtonClick = () => {
    router.push('category/add'); // '/add' rotasına yönlendir
  };

  return (
    <div>
     <h1>Kategori Yönetimi</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Fotoğraf</TableCell>
              <TableCell align="right">Ad Soyad</TableCell>
              <TableCell align="right">Tarih</TableCell>
              <TableCell align="right">Color</TableCell>
              <TableCell align="right">Düzenle</TableCell>
              <TableCell align="right">Kaldır</TableCell>
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
                  <EditIcon />
                </TableCell>
                <TableCell align="right">
                  <DeleteIcon />
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
    </div>
  );
}
