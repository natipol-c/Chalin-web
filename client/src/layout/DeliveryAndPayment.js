import { Box, Typography, Divider, Button } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const DeliveryAndPayment = ({ setDelivery, setAddress, setPayment, delivery, payment }) => {
    const handleDeliveryClick = () => {
        MySwal.fire({
            title: '<strong style="font-family: Kanit, sans-serif;">การจัดส่ง</strong>',
            html: `
                <label for="deliveryDropdown" style="font-family: Kanit, sans-serif;">เลือกการจัดส่ง</label>
                <select id="deliveryDropdown" class="swal2-select" style="font-family: Kanit, sans-serif;">
                    <option value="รับหน้าร้าน" style="font-family: Kanit, sans-serif;">รับหน้าร้าน</option>
                    <option value="จัดส่ง" style="font-family: Kanit, sans-serif;">จัดส่ง</option>
                </select>
                <div id="addressInput" style="display: none; margin-top: 15px;">
                    <label for="addressField" style="font-family: Kanit, sans-serif;">ที่อยู่</label>
                    <textarea id="addressField" class="swal2-textarea" placeholder="**บริเวณ มหาวิทยาลัยเกษตรศาสตร์ ศรีราชา เท่านั้น**" style="font-family: Kanit, sans-serif;"></textarea>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: '<span style="font-family: Kanit, sans-serif;">ยืนยัน</span>',
            cancelButtonText: '<span style="font-family: Kanit, sans-serif;">ยกเลิก</span>',
            didOpen: () => {
                const deliveryDropdown = document.getElementById('deliveryDropdown');
                deliveryDropdown.addEventListener('change', (e) => {
                    if (e.target.value === 'จัดส่ง') {
                        document.getElementById('addressInput').style.display = 'block';
                    } else {
                        document.getElementById('addressInput').style.display = 'none';
                    }
                });
            },
            preConfirm: () => {
                const delivery = document.getElementById('deliveryDropdown').value;
                if (delivery === 'จัดส่ง') {
                    const address = document.getElementById('addressField').value;
                    if (!address) {
                        Swal.showValidationMessage('<span style="font-family: Kanit, sans-serif;">กรุณากรอกที่อยู่</span>');
                        return false;
                    }
                    setAddress(address);
                    return { delivery, address };
                }
                setAddress('');
                return { delivery };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setDelivery(result.value.delivery);
                console.log('Delivery info:', result.value);
            }
        });
    };

    const handlePaymentClick = () => {
        MySwal.fire({
            title: '<strong style="font-family: Kanit, sans-serif;">การชำระเงิน</strong>',
            html: `
                <label for="paymentDropdown" style="font-family: Kanit, sans-serif;">เลือกการชำระเงิน</label>
                <select id="paymentDropdown" class="swal2-select" style="font-family: Kanit, sans-serif;">
                    <option value="เงินสด" style="font-family: Kanit, sans-serif;">เงินสด</option>
                    <option value="QR พร้อมเพย์" style="font-family: Kanit, sans-serif;">QR พร้อมเพย์</option>
                </select>
            `,
            showCancelButton: true,
            confirmButtonText: '<span style="font-family: Kanit, sans-serif;">ยืนยัน</span>',
            cancelButtonText: '<span style="font-family: Kanit, sans-serif;">ยกเลิก</span>',
            preConfirm: () => {
                const payment = document.getElementById('paymentDropdown').value;
                return { payment };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setPayment(result.value.payment);
                console.log('Payment info:', result.value);
            }
        });
    };

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Divider />

            {/* ส่วนของการจัดส่ง */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', width: '980px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocalShippingOutlinedIcon sx={{ fontSize: 30 }} />
                    <Typography variant="body1" sx={{ marginLeft: 2, fontFamily: 'Kanit, sans-serif' }}>
                        การจัดส่ง
                    </Typography>
                </Box>
                <Button
                    onClick={handleDeliveryClick}
                    endIcon={<ChevronRightIcon />}
                    sx={{ fontFamily: 'Kanit, sans-serif', color: 'black' }}
                >
                    {delivery || 'เลือกการจัดส่ง'}
                </Button>
            </Box>

            <Divider />

            {/* ส่วนของการชำระเงิน */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', width: '980px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CreditCardIcon sx={{ fontSize: 30 }} />
                    <Typography variant="body1" sx={{ marginLeft: 2, fontFamily: 'Kanit, sans-serif' }}>
                        การชำระเงิน
                    </Typography>
                </Box>
                <Button
                    onClick={handlePaymentClick}
                    endIcon={<ChevronRightIcon />}
                    sx={{ fontFamily: 'Kanit, sans-serif', color: 'black' }}
                >
                    {payment || 'เลือกการชำระเงิน'}
                </Button>
            </Box>

            <Divider />
        </Box>
    );
};

export default DeliveryAndPayment;
