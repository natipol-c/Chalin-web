import React from 'react';
import { Box, Typography, Divider, Grid, Avatar } from '@mui/material';
import { Card } from 'antd';
import SideBarProfile from '../../layout/SideBarProfile';
import { useSelector } from 'react-redux';

const ProfileUser = () => {
    // ดึงข้อมูลผู้ใช้จาก Redux state
    const userData = useSelector((state) => state.user.user); // แก้ไขตรงนี้

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            {/* Sidebar */}
            <SideBarProfile />

            {/* Main content */}
            <Box sx={{ width: '80%', padding: 3, backgroundColor: 'white' }}>
                <br /><br /><br />
                <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Kanit, sans-serif' }}>
                    <strong>ข้อมูลผู้ใช้งาน</strong>
                </Typography>

                <Card>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={3} md={2}>
                            <Avatar src="/assets/user01.png" sx={{ width: 80, height: 80 }} />
                        </Grid>
                        <Grid item xs={9} md={10}>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Typography variant="h6" sx={{ fontFamily: 'Kanit, sans-serif' }}>คุณ</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" sx={{ fontFamily: 'Kanit, sans-serif', marginLeft: 13 }}>
                                        {userData.displayName || userData.email || 'ไม่มีข้อมูล'}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Typography variant="h6" sx={{ fontFamily: 'Kanit, sans-serif' }}>
                                        คะแนนสะสม
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h4" color="error" sx={{ fontFamily: 'Kanit, sans-serif', marginLeft: 5 }}>
                                        <strong>{userData.orderCount || 0}</strong>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h4" color="error" sx={{ fontFamily: 'Kanit, sans-serif', marginLeft: 5 }}>
                                        <strong>คะแนน</strong>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: 'Kanit, sans-serif' }}>
                        <strong>ข้อมูลส่วนตัว</strong>
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{ fontFamily: 'Kanit, sans-serif', marginLeft: 3 }}>Email</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{ fontFamily: 'Kanit, sans-serif', textAlign: 'right', marginRight: 100, whiteSpace: 'nowrap' }}>
                                {userData.email || 'ไม่มีข้อมูล'}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography sx={{ fontFamily: 'Kanit, sans-serif', marginLeft: 3 }}>ชื่อ</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{ fontFamily: 'Kanit, sans-serif', textAlign: 'right', marginRight: 100, whiteSpace: 'nowrap' }}>
                                {userData.displayName || userData.email || 'ไม่มีข้อมูล'}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: 'Kanit, sans-serif' }}>
                        <strong>บัญชีผู้ใช้งาน</strong>
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{ fontFamily: 'Kanit, sans-serif', marginLeft: 3 }}>รหัสสมาชิก</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{ fontFamily: 'Kanit, sans-serif', textAlign: 'right', marginRight: 100, whiteSpace: 'nowrap' }}>
                                {userData._id || 'ไม่มีข้อมูล'}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography sx={{ fontFamily: 'Kanit, sans-serif', marginLeft: 3 }}>IP Address</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography sx={{ fontFamily: 'Kanit, sans-serif', textAlign: 'right', marginRight: 100, whiteSpace: 'nowrap' }}>
                                {userData.ip || 'ไม่มีข้อมูล'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            </Box>
        </Box>
    );
}

export default ProfileUser;
