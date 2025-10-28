import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Card, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const CarouselBar = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: '100%', maxWidth: '1980px' }}>
                <Carousel
                    interval={5000}
                    autoPlay={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                >
                    <div>
                        <img 
                            src="/assets/promotion00.png" 
                            alt="Promotion 1" 
                            style={{ width: '100%', height: 'auto', maxHeight: '580px', objectFit: 'cover' }}
                        />
                        
                    </div>

                    <div>
                        <img 
                            src="/assets/promotion01.png" 
                            alt="Promotion 2" 
                            style={{ width: '100%', height: 'auto', maxHeight: '580px', objectFit: 'cover' }} 
                        />
                    </div>

                    <div>
                        <img 
                            src="/assets/promotion02.png" 
                            alt="Promotion 3" 
                            style={{ width: '100%', height: 'auto', maxHeight: '580px', objectFit: 'cover' }} 
                        />
                    </div>
                </Carousel>
            </Card>
        </Box>
    );
}

export default CarouselBar;
