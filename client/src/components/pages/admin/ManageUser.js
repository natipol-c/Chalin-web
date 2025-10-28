import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import  Paper  from '@mui/material/Paper';
//function
import { list, changeRole } from '../../../functions/user'
import { MenuItem, Select, Box } from '@mui/material';

const ManageUser = () => {
    const [data, setData] = useState([])
    const { user } = useSelector((state) => ({ ...state }))
    console.log(data)

    useEffect(() => {
        loadData(user.user.token)
    }, [])

    const loadData = async (authoken) => {
        await list(authoken)
            .then((res) => {
                setData(res.data)
            }).catch(err => console.log(err))
    }


    const role = ['admin', 'user']

    const handleChangeRole = async (id, e) => {
        console.log(id, e.target.value)
        const value = {
            id: id,
            role: e.target.value,
        }
        await changeRole(user.user.token, value)
            .then((res) => {
                loadData(user.user.token)
            }).catch(err => console.log(err))
    }



    return (
        <div>
            <Box p={3}>
                <Box display="flex" alignItems="center" mb={2}>
                    <h2 style={{ fontFamily: 'Kanit, sans-serif', color: 'Black' }}><strong>จัดการผู้ใช้</strong></h2>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ backgroundColor: '#FFCA03' }}><strong>เลขที่</strong></TableCell>
                                <TableCell sx={{ backgroundColor: '#FFCA03' }}><strong>อีเมล์</strong></TableCell>
                                <TableCell sx={{ backgroundColor: '#FFCA03' }}><strong>ตำแหน่ง</strong></TableCell>
                                <TableCell sx={{ backgroundColor: '#FFCA03' }}><strong>IP</strong></TableCell>
                                <TableCell sx={{ backgroundColor: '#FFCA03' }}><strong>วันที่ / เวลา</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.length > 0 ? (
                                data.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            backgroundColor: item.role === 'admin' ? '#ede7f6' :
                                                item.role === 'user' ? '#e1f5fe' : 'transparent',
                                            '&:last-child td, &:last-child th': { border: 0 }
                                        }}
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>
                                            <Select
                                                onChange={(e) => handleChangeRole(item._id, e)}
                                                value={item.role} // ใช้ `value` แทน `defaultValue`
                                                style={{ width: '100px' }}
                                            >
                                                {role.map((roleItem) =>
                                                    <MenuItem key={roleItem} value={roleItem}>{roleItem}</MenuItem>
                                                )}
                                            </Select>
                                        </TableCell>
                                        <TableCell>{item.ip}</TableCell>
                                        <TableCell>{new Date(item.updatedAt).toLocaleString()}</TableCell>
                                    </TableRow>
                                ))
                            ) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
}



export default ManageUser