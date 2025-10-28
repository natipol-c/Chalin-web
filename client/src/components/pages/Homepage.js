import React from 'react';
import { Button } from 'antd';
import { Box, Container, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CoffeeMakerOutlinedIcon from '@mui/icons-material/CoffeeMakerOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';


const Homepage = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Container sx={{ width: '100%', maxWidth: '100%', minHeight: '100vh', mt: '120px' }}>

                {/* วรรค1 */}
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h4" component="h2" sx={{ fontFamily: 'Kanit, sans-serif', fontWeight: 'bold' }}>
                            สร้างสรรค์เครื่องดื่ม<br />ด้วยตัวเอง.
                        </Typography>

                        <Typography variant="body1" sx={{ fontFamily: 'Kanit, sans-serif', fontSize: '18px', mt: 2 }}>
                            ที่ CHLIN ฌลิล เราเชื่อว่าเครื่องดื่มที่ดีที่สุดคือเครื่องดื่มที่ตรงกับความชอบของคุณที่สุด!
                            <br />
                            ไม่ว่าคุณจะชอบกาแฟรสเข้มที่ผสานกับนมสดหอมมัน
                            <br />
                            หรืออยากลองชาเขียวเข้มข้นพร้อมกับไซรัปผลไม้สดใหม่
                            <br />
                            เรามีวัตถุดิบหลากหลายให้คุณเลือกใช้ในการครีเอทเครื่องดื่มที่สมบูรณ์แบบที่สุดสำหรับคุณ
                        </Typography>

                        {/* Button */}
                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'left' }}>
                            <Button
                                type="primary"
                                style={{
                                    fontFamily: 'Kanit, sans-serif',
                                    backgroundColor: '#FFCA03',
                                    color: 'black',
                                    padding: '20px 20px',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    borderRadius: '50px',
                                }}
                                onClick={() => navigate('/product')}
                            >
                                เริ่มกันเลย !
                            </Button>
                        </Box>
                    </Box>

                    <Card sx={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        padding: '20px',
                        marginLeft: '20px',
                        backgroundColor: 'rgba(204, 24, 25, 0.1)',
                        borderRadius: '30px'
                    }}>
                        <img
                            src="/assets/thaigreen.png"
                            alt="สร้างสรรค์เครื่องดื่ม"
                            style={{ width: '300px', height: 'auto', borderRadius: '10px' }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Kanit, sans-serif', textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}>
                            ส้มเขียวหวาน
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'Kanit, sans-serif', textAlign: 'center', marginTop: '10px' }}>
                            ชาไทยและชาเขียว
                        </Typography>
                        <Typography variant="h4" sx={{ fontFamily: 'Kanit, sans-serif', textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}>
                            45 บาท
                        </Typography>
                    </Card>
                </Box>
                <br /><br /><br /><br /><br /><br />

                {/* วรรค2 */}
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h4" component="h2" sx={{ fontFamily: 'Kanit, sans-serif', fontWeight: 'bold' }}>
                            ทำไมต้อง CHLIN ฌลิล.
                        </Typography>

                        <Typography variant="body1" sx={{ fontFamily: 'Kanit, sans-serif', fontSize: '18px', mt: 2 }}>
                            เพื่อสร้างประสบการณ์การซื้อเครื่องดื่มที่ง่ายดายและเข้าถึงได้ทุกที่ทุกเวลา
                            <br />
                            ผ่านแพลตฟอร์มออนไลน์ที่ใช้งานได้ทั้งบนคอมพิวเตอร์และสมาร์ทโฟน
                            <br />
                            พร้อมบริการที่หลากหลายเพื่อรองรับความต้องการของลูกค้า
                        </Typography>
                        <br /><br /><br />

                        {/* วรรค3 */}
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CoffeeMakerOutlinedIcon sx={{ marginRight: 1, fontSize: '120px' }} />
                                <Box>
                                    <Typography variant="h5" component="h2" sx={{ fontFamily: 'Kanit, sans-serif', fontWeight: 'bold' }}>
                                        สร้างสรรค์เครื่องดื่ม
                                    </Typography>

                                    <Typography variant="body1" sx={{ fontFamily: 'Kanit, sans-serif', fontSize: '18px', mt: 2 }}>
                                        ไม่ว่าคุณจะมีความชอบแบบไหน
                                        <br />
                                        เราพร้อมให้คุณสร้างสรรค์เครื่องดื่มในแบบที่คุณ
                                        <br />
                                        ต้องการ แล้วมาอวดเพื่อนๆ
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* วรรค4 */}
                        <Box sx={{ flex: 1, marginTop: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocalShippingOutlinedIcon sx={{ marginRight: 1, fontSize: '120px' }} />
                                <Box>
                                    <Typography variant="h5" component="h2" sx={{ fontFamily: 'Kanit, sans-serif', fontWeight: 'bold' }}>
                                        มีบริการเดลิเวอรี่
                                    </Typography>

                                    <Typography variant="body1" sx={{ fontFamily: 'Kanit, sans-serif', fontSize: '18px', mt: 2 }}>
                                        ลูกค้าสามารถสั่งซื้อเครื่องดื่มได้จากพื้นที่ใกล้เคียงกับ
                                        <br />
                                        ร้านค้า พร้อมบริการจัดส่งที่รวดเร็ว
                                        <br />
                                        ไม่ว่าจะสั่งในช่วงเวลาใดของวันที่ร้านเปิดทำการ
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        {/* วรรค5 */}
                        <Box sx={{ flex: 1, marginTop: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CreditCardOutlinedIcon sx={{ marginRight: 1, fontSize: '120px' }} />
                                <Box>
                                    <Typography variant="h5" component="h2" sx={{ fontFamily: 'Kanit, sans-serif', fontWeight: 'bold' }}>
                                        การชำระเงิน
                                    </Typography>

                                    <Typography variant="body1" sx={{ fontFamily: 'Kanit, sans-serif', fontSize: '18px', mt: 2 }}>
                                        ชำระเงินได้สะดวกผ่านพร้อมเพย์
                                        <br />
                                        และจ่ายเงินปลายทาง
                                        <br />
                                        เพื่อให้การซื้อเครื่องดื่มเป็นเรื่องง่ายสำหรับทุกคน
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Card sx={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        padding: '0px',
                        marginLeft: '20px',
                        backgroundColor: 'rgba(204, 24, 25, 0.1)',
                        borderRadius: '30px'
                    }}>
                        <img
                            src="/assets/old-barista.jpg"
                            alt="สร้างสรรค์เครื่องดื่ม"
                            style={{ width: '400px', height: 'auto', borderRadius: '10px' }}
                        />
                    </Card>
                </Box>
            </Container>
        </Box>
    );
}

export default Homepage;
