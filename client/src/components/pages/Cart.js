import React, { useContext, useState } from 'react';
import { Box, Typography, Divider, Button, IconButton } from '@mui/material';
import { Card } from 'antd';
import SideBarProfile from '../../layout/SideBarProfile';
import { CartContext } from '../../functions/CartContext';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import DeliveryAndPayment from '../../layout/DeliveryAndPayment';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Cartby } from '../../functions/product';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const MySwal = withReactContent(Swal);

const Cart = () => {
    const { cartItems, removeFromCart, totalAmount, increaseQuantity, decreaseQuantity,clearCart } = useContext(CartContext);
    const [delivery, setDelivery] = useState('');
    const [address, setAddress] = useState('');
    const [payment, setPayment] = useState('');
    const userEmail = useSelector(state => state.user.user.email); // ดึง email จาก Redux state

    const handlePlaceOrder = () => {
        if (!delivery || !payment || cartItems.length === 0) {
            toast.error('กรุณากรอกข้อมูลให้ครบถ้วน', {
                position: "top-left",
                theme: "dark"
            });
            return;
        }
    
        MySwal.fire({
            title: 'ยืนยันการสั่งซื้อหรือไม่?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
            customClass: {
                title: 'kanit-font',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const formData = new FormData();
                formData.append('delivery', delivery);
                formData.append('address', address);
                formData.append('payment', payment);
                formData.append('items', JSON.stringify(cartItems));
                formData.append('totalAmount', totalAmount);
                formData.append('email', userEmail);
    
                if (payment === 'QR พร้อมเพย์') {
                    MySwal.fire({
                        title: '<strong>Scan QR CODE</strong>',
                        html:
                            <div style={{ textAlign: 'center' }}>
                                <img src="/assets/QRchlin.jpg" alt="QR Code" style={{ width: '50%', height: '50%', maxWidth: '400px' }} />
                                <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '18px' }}>CHLIN</p>
                                <input type="file" id="slipFile" accept="image/*" class="swal2-file" />
                            </div>,
                        showCancelButton: true,
                        confirmButtonText: 'ยืนยัน',
                        cancelButtonText: 'ยกเลิก',
                        customClass: {
                            title: 'kanit-font',
                        },
                        preConfirm: () => {
                            const fileInput = document.getElementById('slipFile');
                            if (fileInput && fileInput.files.length > 0) {
                                const slipFile = fileInput.files[0];
                                formData.append('slip', slipFile);
                            } else {
                                Swal.showValidationMessage('กรุณาอัปโหลดสลิปการชำระเงิน');
                                return false;
                            }
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Cartby(formData).then(response => {
                                console.log("Order placed successfully:", response.data);
                                toast.success('สั่งซื้อสินค้าสำเร็จ', {
                                    position: "top-left",
                                    theme: "dark"
                                });
                                clearCart();
                                setDelivery('');
                                setAddress('');
                                setPayment('');
                                MySwal.fire({
                                    title: 'สั่งซื้อสินค้าสำเร็จ !',
                                    text: 'ขอบคุณสำหรับการสั่งซื้อ',
                                    icon: 'success',
                                    confirmButtonText: 'ตกลง',
                                    customClass: {
                                        title: 'kanit-font',
                                    },
                                });
                            }).catch(error => {
                                console.error('Error placing order:', error);
                            });
                        }
                    });
                } else if (payment === 'เงินสด') {
                    Cartby(formData).then(response => {
                        console.log("Order placed successfully:", response.data);
                        toast.success('สั่งซื้อสินค้าสำเร็จ', {
                            position: "top-left",
                            theme: "dark"
                        });
                        clearCart();
                        setDelivery('');
                        setAddress('');
                        setPayment('');
                        MySwal.fire({
                            title: 'สั่งซื้อสินค้าสำเร็จ!',
                            text: 'ขอบคุณสำหรับการสั่งซื้อ',
                            icon: 'success',
                            confirmButtonText: 'ตกลง',
                            customClass: {
                                title: 'kanit-font',
                            },
                        });
                    }).catch(error => {
                        console.error('Error placing order:', error);
                    });
                }
            }
        });
    };

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <SideBarProfile />

            <Box sx={{ width: '80%', padding: 3, backgroundColor: 'white' }}>
                <br /><br /><br />
                <Typography variant="h5" gutterBottom style={{ fontFamily: 'Kanit, sans-serif' }}>
                    <strong>ตระกร้าสินค้าของคุณ</strong>
                </Typography>
                <Divider sx={{ mb: 2, borderWidth: '1px', borderColor: 'rgba(0, 0, 0, 0.5)', width: '1000px' }} />
                <br />

                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <Card key={index} style={{ marginBottom: '15px', width: '1000px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={`http://localhost:5000/uploads/${item.image}`}
                                        alt={item.name}
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'contain',
                                            borderRadius: '10px',
                                            marginRight: '15px'
                                        }}
                                    />

                                    <Box>
                                        <Typography variant="h6" sx={{ fontFamily: 'Kanit, sans-serif' }}>
                                            {item.name}
                                        </Typography>

                                        <Typography variant="body2" sx={{ fontFamily: 'Kanit, sans-serif', color: '#757575' }}>
                                            {item.detail}
                                        </Typography>

                                        <Box sx={{ mt: '20px', display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '50px', padding: '1px 5px' }}>
                                            <IconButton onClick={() => decreaseQuantity(item.id)} size="small" sx={{ backgroundColor: '#f0f0f0', borderRadius: '50%' }}>
                                                <RemoveCircleOutlineOutlinedIcon />
                                            </IconButton>

                                            <Typography sx={{ margin: '0 15px' }}>{item.quantity}</Typography>

                                            <IconButton onClick={() => increaseQuantity(item.id)} size="small" sx={{ backgroundColor: '#f0f0f0', borderRadius: '50%' }}>
                                                <AddCircleOutlineOutlinedIcon />
                                            </IconButton>

                                        </Box>
                                    </Box>
                                </Box>

                                <Box>
                                    <Typography variant="h6" sx={{ fontFamily: 'Kanit, sans-serif', fontWeight: 'bold' }}>
                                        {item.price * item.quantity} บาท
                                    </Typography>

                                    <IconButton sx={{ display: 'flex', justifyContent: 'flex-end' }} color="error" onClick={() => removeFromCart(item.id)}>
                                        <DeleteOutlineOutlinedIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Card>
                    ))
                ) : (
                    <Typography variant="body1" sx={{ fontFamily: 'Kanit, sans-serif' }}>
                        ไม่มีสินค้าที่เลือกในตะกร้า
                    </Typography>
                )}

                <br />
                {/* ส่วนของการเลือกการจัดส่งและการชำระเงิน */}
                <DeliveryAndPayment
                    setDelivery={setDelivery}
                    setAddress={setAddress}
                    setPayment={setPayment}
                    delivery={delivery}
                    payment={payment}
                />
                <Divider sx={{ mb: 2, borderWidth: '2px', borderColor: 'black', width: '1000px' }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '980px' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Kanit, sans-serif', fontWeight: 'bold' }}>
                        ยอดรวม
                    </Typography>

                    <Typography variant="h6" sx={{ fontFamily: 'Kanit, sans-serif', fontWeight: 'bold' }}>
                        {totalAmount} บาท
                    </Typography>
                </Box>

                <br /><br />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '1000px' }}>
                    <Button
                        variant="contained"
                        color="warning"
                        sx={{ borderRadius: '20px', fontFamily: 'Kanit, sans-serif' }}
                        disabled={cartItems.length === 0}
                        onClick={handlePlaceOrder}
                    >
                        สั่งซื้อสินค้า
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Cart;
