import React, { useState, useEffect } from 'react'
import { remove, create, getdata } from '../functions/product'
import { Link } from 'react-router-dom'

import { Box, Button, TextField, Select, MenuItem } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
//แจ้งเตือน
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'

const FormProduct = () => {
    const [data, setData] = useState([])
    const [form, setForm] = useState({
        detail: '',
        detail2: ''
    })

    const detailOptions = ["Iced", "Frappe", "Hot", "Ingredient", "Topping", "Process", "Cup"];
    const detail2Options = ["Coffee", "Milk-Cocoa", "Tea", "Ingredient", "Topping", "Process", "Cup"];

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        getdata()
            .then((res) => setData(res.data))
            .catch((err) => console.log(err))
    }

    const handleChange = (e) => {
        if (e.target.name === 'file') {
            setForm({
                ...form,
                [e.target.name]: e.target.files[0]
            })
        } else {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formWithImageData = new FormData();
        for (const key in form) {
            formWithImageData.append(key, form[key]);
        }
        Swal.fire({
            title: 'ยืนยันการเพิ่มสินค้าใหม่ ?',
            text: "คุณต้องการสร้างสินค้าใหม่ใช่หรือไม่ ?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                create(formWithImageData)
                    .then(res => {
                        toast.success('เพิ่มสินค้า ' + res.data.name + ' สำเร็จ!', {
                            position: "top-right",
                            theme: "dark"
                        });
                        loadData();
                    })
                    .catch((err) => {
                        toast.error('เกิดข้อผิดพลาดในการเพิ่มสินค้า', {
                            position: "top-right",
                            theme: "dark"
                        });
                        console.log(err);
                    });
            }
        });
    };

    const handleRemove = async (id) => {
        Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: "คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                remove(id)
                    .then(res => {
                        toast.success('ลบ ' + res.data.name + ' สำเร็จ', {
                            position: "top-right",
                            theme: "dark"
                        });
                        loadData();
                    })
                    .catch((err) => {
                        toast.error('เกิดข้อผิดพลาดในการลบสินค้า', {
                            position: "top-right",
                            theme: "dark"
                        });
                        console.log(err);
                    });
            }
        });
    };

    return (
        <Box p={3}>
            <h2 style={{ fontFamily: 'Kanit, sans-serif' }}><strong>รายการสินค้า</strong></h2>
            <Box display="flex" alignItems="center" justifyContent="flex-start" marginTop={5}>
                <AddCircleOutlineIcon fontSize="large" style={{ marginRight: '20px', marginLeft: '50px', color: 'black' }} />
                <h2 style={{ margin: 0, fontFamily: 'Kanit, sans-serif' }}><strong>เพิ่มรายการสินค้า</strong></h2>
            </Box><br />
            <Paper elevation={2} style={{ padding: '40px', backgroundColor: '#fff' }}>
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <Box mb={2}>
                        <TextField
                            id="name-field"
                            label="ชื่อสินค้า"
                            name='name'
                            sx={{ width: '20%', marginRight: 30 }}
                            fullWidth
                            onChange={e => handleChange(e)}
                            variant="outlined"
                        />

                        <input
                            type='file'
                            id="file-upload"
                            label="file"
                            name='file'
                            sx={{ width: '20%' }}
                            onChange={e => handleChange(e)}
                            variant="outlined"
                            style={{ marginRight: 2 }}
                        />
                    </Box>

                    <Box mb={2}>
                        <Select
                            id="detail-field"
                            label="Product Detail"
                            name='detail'
                            value={form.detail}
                            onChange={handleChange}
                            sx={{ width: '20%', marginRight: 30 }}
                        >
                            {detailOptions.map((option, index) => (
                                <MenuItem key={index} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>

                        <TextField
                            type='number'
                            id="price-field"
                            label="ราคา"
                            name='price'
                            sx={{ width: '20%' }}
                            onChange={e => handleChange(e)}
                            variant="outlined"
                            style={{ marginRight: 2 }}
                        />
                    </Box>

                    <Select
                        id="detail2-field"
                        label="Product Detail 2"
                        name='detail2'
                        value={form.detail2}
                        onChange={handleChange}
                        sx={{ width: '20%', marginRight: 30 }}
                    >
                        {detail2Options.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>

                    <Button variant="contained" color="primary" type='submit' sx={{ marginLeft: 170 }}>
                        Submit
                    </Button>
                </form>
            </Paper><br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#FFCA03' }}><strong>เลขที่</strong></TableCell>
                            <TableCell sx={{ backgroundColor: '#FFCA03' }}><strong>ชื่อสินค้า</strong></TableCell>
                            <TableCell sx={{ backgroundColor: '#FFCA03' }}><strong>ประเภทสินค้า</strong></TableCell>
                            <TableCell sx={{ backgroundColor: '#FFCA03' }}><strong>ประเภทสินค้า2</strong></TableCell>
                            <TableCell sx={{ backgroundColor: '#FFCA03' }}><strong>รูปภาพสินค้า</strong></TableCell>
                            <TableCell sx={{ backgroundColor: '#FFCA03' }}><strong>ราคา</strong></TableCell>
                            <TableCell sx={{ backgroundColor: '#FFCA03' }}><strong>ลบ</strong></TableCell>
                            <TableCell sx={{ backgroundColor: '#FFCA03' }}><strong>แก้ไข</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data ?
                            data.map((item, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        backgroundColor: item.detail === 'Iced' ? '#e1f5fe' :
                                            item.detail === 'Frappe' ? '#d0f8ce' :
                                                item.detail === 'Ingredient' ? '#f9fbe7' :
                                                    item.detail === 'Topping' ? '#ffe0b2' :
                                                        item.detail === 'Process' ? '#c5cae9' :
                                                            item.detail === 'Cup' ? '#e1bee7' : 'transparent',
                                        '&:last-child td, &:last-child th': { border: 0 }
                                    }}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.detail}</TableCell>
                                    <TableCell>{item.detail2}</TableCell>
                                    <TableCell>{item.file}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>
                                        <DeleteIcon
                                            color='error'
                                            onClick={() => handleRemove(item._id)} />
                                    </TableCell>
                                    <TableCell>
                                        <Link to={'/edit/' + item._id}>
                                            <EditIcon />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                            : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default FormProduct
