import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { read, update } from '../functions/product'
import { Box, Button, TextField, Select, MenuItem } from '@mui/material';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2'

const FormEditProduct = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: '',
        detail: '',
        detail2: '',
        price: ''
    })
    const [fileold, setFileOld] = useState()
    const detailOptions = ["Iced", "Frappe","Ingredient","Topping","Process","Cup"];
    const detail2Options = ["Coffee", "Milk-Cocoa", "Tea","Ingredient","Topping","Process","Cup"];


    useEffect(() => {
        loadData(params.id)
    }, [])

    const loadData = async (id) => {
        read(params.id)
            .then((res) => {
                setData(res.data)
                setFileOld(res.data.file)
            })
    }
    const handleChange = (e) => {
        if (e.target.name === 'file') {
            setData({
                ...data,
                [e.target.name]: e.target.files[0]
            })
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(data)
        console.log(fileold)
        const formWithImageData = new FormData()
        for (const key in data) {

            formWithImageData.append(key, data[key])
        }
        Swal.fire({
            title: 'ยืนยันการแก้ไขสินค้า ?',
            text: "คุณต้องการแก้ไขสินค้าใช่หรือไม่ ?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                update(params.id, formWithImageData)
                    .then(res => {
                        console.log(res.data)
                        toast.success('แก้ไขสินค้า ' + res.data.name + ' สำเร็จ!', {
                            position: "top-right",
                            theme: "dark"
                        });
                        navigate('/admin/viewtable')
                    })
                    .catch((err) => {
                        toast.error('เกิดข้อผิดพลาดในการเพิ่มสินค้า', {
                            position: "top-right",
                            theme: "dark"
                        });
                        console.log(err);
                    });
            } else if (result.isDismissed) {
                navigate('/admin/viewtable');
            }
        });
    }


    return (
        <Box p={3}>
            <h2 style={{ fontFamily: 'Kanit, sans-serif' }}><strong>รายการสินค้า</strong></h2>
            <Box display="flex" alignItems="center" justifyContent="flex-start" marginTop={5}>
                <EditIcon fontSize="large" style={{ marginRight: '20px', marginLeft: '50px', color: 'black' }} />
                <h2 style={{ margin: 0, fontFamily: 'Kanit, sans-serif' }}><strong>แก้ไขรายการสินค้า</strong></h2>
            </Box><br />
            <Paper elevation={2} style={{ padding: '40px', backgroundColor: '#fff' }}>
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <Box mb={2}>
                        <TextField
                            type='text'
                            label="ชื่อสินค้า"
                            name='name'
                            placeholder='name'
                            value={data.name}
                            sx={{ width: '20%', marginRight: 30 }}
                            fullWidth
                            onChange={e => handleChange(e)}
                            variant="outlined"
                        />

                        <input
                            type='file'
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

                            label="Product Detail"
                            name='detail'
                            placeholder='detail'
                            value={data.detail}
                            sx={{ width: '20%', marginRight: 30 }}
                            fullWidth
                            onChange={e => handleChange(e)}
                            variant="outlined"
                        >
                            {detailOptions.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                            ))}
                        </Select>

                        <TextField
                            type='number'
                            label="ราคา"
                            name='price'
                            placeholder='price'
                            value={data.price}
                            sx={{ width: '20%' }}
                            onChange={e => handleChange(e)}
                            style={{ marginRight: 2 }}
                        />

                    </Box>

                    <Select

                        label="Product Detail 2"
                        name='detail2'
                        placeholder='detail2'
                        value={data.detail2}
                        onChange={e => handleChange(e)}
                        sx={{ width: '20%', marginRight: 30 }}
                        variant="outlined"
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
        </Box>
    )
}

export default FormEditProduct