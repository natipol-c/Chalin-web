import React from 'react';
import { Box, Typography, Grid, Avatar } from '@mui/material';
import { Card } from 'antd';
import SideBarProfile from '../../../layout/SideBarProfile';
import { useSelector, useDispatch } from 'react-redux';
import { SwapOutlined } from '@ant-design/icons';
import { Button as AntButton } from 'antd';
import Swal from 'sweetalert2'; // นำเข้า SweetAlert2
import { handleConfirmRedeem } from '../../../functions/user';


const CollectPoints = () => {
    const userData = useSelector((state) => state.user.user);
    const orderCount = userData.orderCount || 0;
    const dispatch = useDispatch();

    const showInsufficientPointsAlert = () => {
        Swal.fire({
            title: '',
            html: `
            <div style="background-color: #CD1818; padding: 30px 10; border-radius: 8px 8px 0 0; color: white; text-align: center; font-family: 'Kanit', sans-serif;">
                <h2 style="margin: 0; font-size: 24px; font-weight: bold;">คะแนนสะสมไม่พอ</h2>
                <p style="margin: 5px 0 0;">คุณต้องมีคะแนนสะสมครบ 10 คะแนนเพื่อแลกเครื่องดื่มฟรี</p>
            </div>`,
            icon: 'warning',
            confirmButtonText: 'ตกลง',
            confirmButtonColor: '#3085d6',
            customClass: {
                popup: 'swal2-popup-kanit',
            },
        });
    };
    const showSweetAlert = () => {
        Swal.fire({
            title: '',
            html: `
            <div style="background-color: #CD1818; padding: 30px 10; border-radius: 8px 8px 0 0; color: white; text-align: center; font-family: 'Kanit', sans-serif;">
                <h2 style="margin: 0; font-size: 24px; font-weight: bold;">ขอแสดงความยินดี</h2>
                <p style="margin: 5px 0 0;">คุณได้รับสิทธิ์ แลกรับเครื่องดื่มฟรี 1 แก้ว !!</p>
            </div>
            <div style="display: flex; justify-content: center; align-items: center; background-color: white; padding: 10px 0;">
                <img src="/assets/point1.png" alt="เครื่องดื่มซ้าย" style="width: 50%; height: auto; border-radius: 0 0 0 8px;" />
                <img src="/assets/point2.png" alt="เครื่องดื่มขวา" style="width: 50%; height: auto; border-radius: 0 0 8px 0;" />
            </div>
            <p style="margin: 10px 0; font-size: 16px; font-family: 'Kanit', sans-serif;">มูลค่าเครื่องดื่ม ราคาไม่เกิน 50 บาท</p>
            `,
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            customClass: {
                popup: 'swal2-popup-kanit',
            },
            width: '400px',
            padding: '0',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handleConfirmRedeem(userData._id, dispatch);
                Swal.fire({
                    title: '',
                    html: `
                    <div style="background-color: #CD1818; padding: 30px 10; border-radius: 8px 8px 0 0; color: white; text-align: center; font-family: 'Kanit', sans-serif;">
                        <h2 style="margin: 0; font-size: 24px; font-weight: bold;">รับเครื่องดื่มฟรี 1 แก้ว</h2>
                        <p style="margin: 5px 0 0;">มูลค่าเครื่องดื่ม ราคาไม่เกิน 50 บาท</p>
                    </div>
                    <div style="display: flex; justify-content: center; align-items: center; background-color: white; padding: 10px 0;">
                        <img src="/assets/point1.png" alt="เครื่องดื่มซ้าย" style="width: 50%; height: auto; border-radius: 0 0 0 8px;" />
                        <img src="/assets/point2.png" alt="เครื่องดื่มขวา" style="width: 50%; height: auto; border-radius: 0 0 8px 0;" />
                    </div>
                    <p style="margin: 10px 0; font-size: 16px; font-family: 'Kanit', sans-serif;">คุณได้กดใช้สิทธิ์เรียบร้อยแล้ว</p>
                    <p style="margin: 10px 0; font-size: 16px; font-weight: bold; font-family: 'Kanit', sans-serif;">**กรุณานำหน้านี้แสดงต่อพนักงาน**</p>
                    `,
                    icon: 'success',
                    confirmButtonText: 'ตกลง',
                    confirmButtonColor: '#3085d6',
                });
            }
        });
    };

    return (
        <Box sx={{ display: 'flex', width: '100%', backgroundColor: 'white' }}>
            {/* Sidebar */}
            <SideBarProfile />

            {/* Main content */}
            <Box sx={{ width: '80%', padding: 3 }}>
                <br /><br /><br />
                <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Kanit, sans-serif' }}>
                    <strong>คะแนนสะสม</strong>
                </Typography>

                <Card>
                    <Grid container spacing={2} alignItems="center">
                        {/* User Profile Section */}
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
                                        <strong>{orderCount}</strong>
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
                </Card>
                <br /><br />
                <Box
                    sx={{
                        backgroundColor: '#D3D3D3',
                        padding: 3,
                        borderRadius: 8,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        maxWidth: 600,
                        margin: '0 auto',
                        position: 'relative'
                    }}
                >
                    <Grid container spacing={3} justifyContent="center">
                        <Grid container item xs={12} justifyContent="center" spacing={3}>
                            {[...Array(5)].map((_, index) => (
                                <Grid item key={index}>
                                    <Box
                                        sx={{
                                            width: 70,
                                            height: 70,
                                            backgroundColor: orderCount > index ? '#FFD700' : '#FFFFFF',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '1px solid #D3D3D3',
                                        }}
                                    >
                                        {orderCount > index ? (
                                            <img
                                                src="/assets/logoChlin.png"
                                                alt="Logo"
                                                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                                            />
                                        ) : null}
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>

                        <Grid container item xs={12} justifyContent="center" spacing={3} sx={{ mt: 1 }}>
                            {[...Array(5)].map((_, index) => (
                                <Grid item key={index + 5}>
                                    <Box
                                        sx={{
                                            width: 70,
                                            height: 70,
                                            backgroundColor: index === 4 ? (orderCount > 9 ? '#FFD700' : 'White') : (orderCount > index + 5 ? '#FFD700' : '#FFFFFF'),
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '1px solid #D3D3D3',
                                        }}
                                    >
                                        {index === 4 ? (
                                            <Typography variant="h6" sx={{ fontFamily: 'Kanit, sans-serif', color: '#CD1818' }}>
                                                FREE
                                            </Typography>
                                        ) : (
                                            orderCount > index + 5 && (
                                                <img
                                                    src="/assets/logoChlin.png"
                                                    alt="Logo"
                                                    style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                                                />
                                            )
                                        )}
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <AntButton
                        shape="circle"
                        icon={<SwapOutlined style={{ color: 'white' }} />}
                        style={{
                            position: 'absolute',
                            bottom: -80,
                            right: 10,
                            backgroundColor: '#0F2C64',
                            border: '1px solid #D3D3D3',
                            width: 50,
                            height: 50,
                        }}
                        onClick={() => {
                            orderCount >= 10 ? showSweetAlert() : showInsufficientPointsAlert();
                        }}
                    />
                    <Typography variant="body2" sx={{ position: 'absolute', bottom: -110, right: 0, fontFamily: 'Kanit, sans-serif' }}>
                        แลกคะแนน
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default CollectPoints;
