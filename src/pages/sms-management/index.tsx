import Card from "@mui/material/Card";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Table} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";

interface RowType {
    id: number
    name: string
    surname: string
    category: []
    degree: string
    phone: string
    website: string
}

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

const SmsManagement = () => {
    const [data, setData] = useState<any>([])
    const [categories, setCategories] = useState<any>([])
    const [selectedPersonIds, setSelectedPersonIds] = useState<number[]>([])
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<any>([])
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>({});
    const router = useRouter();
    const handleSelectOne = (event: any, id: number) => {
        const selectedIndex = selectedPersonIds.indexOf(id);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedPersonIds, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedPersonIds.slice(1));
        } else if (selectedIndex === selectedPersonIds.length - 1) {
            newSelected = newSelected.concat(selectedPersonIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedPersonIds.slice(0, selectedIndex),
                selectedPersonIds.slice(selectedIndex + 1)
            );
        }

        setSelectedPersonIds(newSelected);
    };

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await axios.get('http://localhost:3000/api/category-person')
                setData(response.data.newPersonData)
                setCategories(response.data.categories)
            }
            fetchData()
        } catch (e: any) {
            console.log(e)
        }
    }, []);


    const handleSave = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/category-person', {
                categoryIds: selectedCategoryIds,
                personIds: selectedPersonIds
            })
            if(response.status === 200) {
                setSelectedPersonIds([])
                setSelectedCategoryIds([])
                router.reload();
            }
            console.log(response)
        } catch (e: any) {
            console.log(e)
        }
    }

    const handleModalClose = () => {
        setOpen(false);
        setSelectedItem(null)
    };

    const handleEditClick = (row: any) => {
        setOpen(true)
        setSelectedItem(row)
        console.log(row)
    };

    const deleteCategory = async (id: number, personId: number) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/category-person/${id}/${personId}`)
            if(response.status === 200) {
                setOpen(false)
                setSelectedItem(null)
                router.reload();
            }
        } catch (e: any) {
            console.log(e)
        }
    }

    return (

        <div>
            <Card className='mb-3'>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                    }}
                >
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
                            {
                                categories.map((item: any) => {
                                    return <MenuItem value={item.id}>{item.title}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                    <Button disabled={!(selectedPersonIds.length > 0 && selectedCategoryIds.length > 0)} variant='contained' color='primary' onClick={() => handleSave()}>Kaydet</Button>

                </Box>

            </Card>

            <Card>
                <TableContainer>
                    <Table sx={{minWidth: 800}} aria-label='table in dashboard'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Seç</TableCell>
                                <TableCell>Ad</TableCell>
                                <TableCell>Soyad</TableCell>
                                <TableCell>Unvan</TableCell>
                                <TableCell>Telefon</TableCell>
                                <TableCell>Website</TableCell>
                                <TableCell>Kategori</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row: RowType) => (
                                <TableRow hover key={row.id} sx={{'&:last-of-type td, &:last-of-type th': {border: 0}}}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedPersonIds.indexOf(row.id) !== -1}
                                            onChange={(e) => handleSelectOne(e, row.id)}
                                            value='true'
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box display='flex' alignItems='center'>
                                            <Box>
                                                <Typography variant='subtitle2' fontWeight='bold'>
                                                    {row.name}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='subtitle2' fontWeight='bold'>
                                            {row.surname}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='subtitle2' fontWeight='bold'>
                                            {row.degree}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='subtitle2' fontWeight='bold'>
                                            {row.phone}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='subtitle2' fontWeight='bold'>
                                            {row.website}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='subtitle2' fontWeight='bold'>
                                            {row?.category?.map((item: any) => item.title).join(", ")}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>

                                        <EditIcon onClick={() => handleEditClick(row)} style={{cursor: 'pointer'}}/>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby="delete-modal-title"
                aria-describedby="delete-modal-description"
            >
                <Box sx={modalStyle}>
                    <h2 id="delete-modal-title">Kategori Silme</h2>
                    {
                        selectedItem?.category?.map((item: any) => {
                            return (
                                <Grid item xs={12} sm={6} sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    p: 2,
                                }}>
                                    <Typography variant='subtitle2' fontWeight='bold'>
                                        {item.title}
                                    </Typography>
                                    <DeleteIcon style={{cursor: 'pointer'}} color='error' onClick={() => deleteCategory(item.id, selectedItem.id)}/>
                                </Grid>
                            )
                        })
                    }
                    <Stack direction="row" spacing={2}>
                        <Button onClick={handleModalClose}>Vazgeç</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>

    );
}

export default SmsManagement;
