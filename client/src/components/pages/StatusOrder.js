import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, Stepper, Step, StepLabel, Card, Button } from '@mui/material';
import SideBarProfile from '../../layout/SideBarProfile';
import { listOrderStatus, changeStatusUser } from '../../functions/order';



const StatusOrder = ({ authtoken }) => {
    const steps = ['รอรับออเดอร์', 'จัดเตรียมออเดอร์', 'กำลังจัดส่ง', 'จัดส่งแล้ว'];
    const [loading, setLoading] = useState(true);
    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        const fetchOrderStatus = async () => {
            try {
                const res = await listOrderStatus(authtoken);
                setUserOrders(res.data);
            } catch (error) {
                console.error("Failed to fetch order status:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderStatus();
    }, [authtoken]);

    const handleChangeStatus = async (orderId) => {
        try {
            await changeStatusUser(authtoken, { id: orderId, status: 'ยกเลิก' });
            setUserOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, status: 'ยกเลิก' } : order
                )
            );
        } catch (error) {
            console.error("Failed to cancel order:", error);
        }
    };

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <SideBarProfile />
            <Box sx={{ width: '80%', padding: 3, backgroundColor: 'white' }}>
                <br /><br /><br />
                <Typography variant="h5" gutterBottom style={{ fontFamily: 'Kanit, sans-serif' }}>
                    <strong>สถานะการสั่งซื้อ</strong>
                </Typography>
                <Divider sx={{ mb: 2, my: 5, maxWidth: '1000px', borderColor: 'rgba(0, 0, 0, 0.5)' }} />
                <Card sx={{ padding: 5, maxWidth: '1000px', margin: 'left' }}>
                    {loading ? (
                        <Typography>กำลังโหลด...</Typography>
                    ) : userOrders.length > 0 ? (
                        userOrders.map((order, idx) => {
                            const statusMap = {
                                'รอยืนยัน': 0,
                                'จัดเตรียมออเดอร์': 1,
                                'กำลังจัดส่ง': 2,
                                'จัดส่งแล้ว': 3
                            };
                            const activeStep = statusMap[order.status] || 0;

                            return (
                                <Box key={idx} mt={4}>
                                    {order.status === 'จัดส่งแล้ว' ? (
                                        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Kanit, sans-serif', mt: 2 }}>
                                            <strong style={{ color: '#2baf2b' }}>คำสั่งซื้อของคุณได้ถูกจัดส่งแล้ว !</strong>
                                        </Typography>
                                    ) : order.status === 'ยกเลิก' ? (
                                        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Kanit, sans-serif', mt: 2 }}>
                                            <strong style={{ color: '#CD1818' }}>คำสั่งซื้อของคุณถูกยกเลิก !</strong>
                                        </Typography>
                                    ) : (
                                        <Stepper activeStep={activeStep} alternativeLabel>
                                            {steps.map((label) => (
                                                <Step key={label}>
                                                    <StepLabel>
                                                        <Typography sx={{ fontFamily: 'Kanit, sans-serif' }}>
                                                            {label}
                                                        </Typography>
                                                    </StepLabel>
                                                </Step>
                                            ))}
                                        </Stepper>
                                    )}

                                    <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Kanit, sans-serif', mt: 2 }}>
                                        <strong style={{ color: 'black' }}>รายละเอียดคำสั่งซื้อ</strong>
                                    </Typography>

                                    {order.items?.map((item, index) => (
                                        <Box key={index} mb={2}>
                                            <Card elevation={10}>
                                                <br />
                                                <Box sx={{ display: 'flex', gap: 2, padding: 2 }}>
                                                    <Box sx={{ width: '150px', height: '150px', border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        {item.image ? (
                                                            <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#EBEBEB' }} />
                                                        ) : (
                                                            <Typography variant="caption" color="textSecondary">ไม่มีภาพ</Typography>
                                                        )}
                                                    </Box>

                                                    <Box>
                                                        <Typography display="flex" alignItems="center">
                                                            <span style={{ width: '150px', color: '#B5B0B0', fontFamily: 'Kanit, sans-serif' }}>ชื่อสินค้า</span>
                                                            <span style={{ color: '#CD1818', fontFamily: 'Kanit, sans-serif' }}><strong>{item.name}</strong></span>
                                                        </Typography>
                                                        <Typography display="flex" alignItems="center">
                                                            <span style={{ width: '150px', color: '#B5B0B0', fontFamily: 'Kanit, sans-serif' }}>ประเภทสินค้า</span>
                                                            <span style={{ color: '#CD1818', fontFamily: 'Kanit, sans-serif' }}><strong>{item.detail}</strong></span>
                                                        </Typography>
                                                        <Typography display="flex" alignItems="center">
                                                            <span style={{ width: '150px', color: '#B5B0B0', fontFamily: 'Kanit, sans-serif' }}>จำนวน</span>
                                                            <span style={{ color: '#CD1818', fontFamily: 'Kanit, sans-serif' }}><strong>{item.quantity}</strong></span>
                                                        </Typography>
                                                        <Typography display="flex" alignItems="center">
                                                            <span style={{ width: '150px', color: '#B5B0B0', fontFamily: 'Kanit, sans-serif' }}>ราคา</span>
                                                            <span style={{ color: '#CD1818', fontFamily: 'Kanit, sans-serif' }}><strong>{item.price}</strong></span>
                                                        </Typography>
                                                        <Typography display="flex" alignItems="center">
                                                            <span style={{ width: '150px', color: '#B5B0B0', fontFamily: 'Kanit, sans-serif' }}>วัน / เวลา</span>
                                                            <span style={{ color: '#CD1818', fontFamily: 'Kanit, sans-serif' }}><strong>{new Date(order.createdAt).toLocaleString()}</strong></span>
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: '30px' }}>
                                                    {order.status === 'รอยืนยัน' && (
                                                        <Button
                                                            variant="outlined"
                                                            color="error"
                                                            onClick={() => handleChangeStatus(order._id)} // เพิ่มฟังก์ชันยกเลิก
                                                        >
                                                            ยกเลิกคำสั่งซื้อ
                                                        </Button>
                                                    )}
                                                </Box><br />
                                                
                                            </Card>
                                            <Divider sx={{ mb: 2, my: 5, maxWidth: '1000px', borderColor: 'rgba(0, 0, 0, 0.5)' }} />

                                            {index === order.items.length - 1 && (
                                                <>
                                                <Typography display="flex" alignItems="center">
                                                    <span style={{ width: '150px', color: '#B5B0B0', fontFamily: 'Kanit, sans-serif', fontSize: '25px' }}>ยอดรวม</span>
                                                    <span style={{ color: '#CD1818', fontFamily: 'Kanit, sans-serif', fontSize: '30px', marginLeft: '600px' }}>
                                                        <strong>{order.totalAmount}</strong>
                                                    </span>
                                                    <span style={{ width: '150px', color: '#B5B0B0', fontFamily: 'Kanit, sans-serif', fontSize: '20px', marginLeft: '50px' }}>บาท</span>
                                                </Typography>
                                                <Typography display="flex" alignItems="center">
                                                    <span style={{ width: '150px', color: '#B5B0B0', fontFamily: 'Kanit, sans-serif', fontSize: '20px' }}>ได้รับคะแนน</span>
                                                    <span style={{ color: '#CD1818', fontFamily: 'Kanit, sans-serif', fontSize: '30px', marginLeft: '600px' }}>
                                                        <strong>1</strong>
                                                    </span>
                                                    <span style={{ width: '150px', color: '#B5B0B0', fontFamily: 'Kanit, sans-serif', fontSize: '20px', marginLeft: '50px' }}>คะแนน</span>
                                                </Typography>
                                                </>
                                            )}
                                        </Box>
                                    ))}

                                    <Divider sx={{ mb: 2, my: 5, maxWidth: '1000px', borderColor: 'rgba(0, 0, 0, 0.5)' }} />
                                </Box>
                            );
                        })
                    ) : (
                        <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Kanit, sans-serif', mt: 2 }}>
                            <strong style={{ color: 'Black' }}>กรุณาล็อกอินเพื่อติดตามคำสั่งซื้อ !!!</strong>
                        </Typography>
                    )}
                </Card>
            </Box>
        </Box>
    );
};

export default StatusOrder;
