import React from 'react'
import { Box, Container, Typography, IconButton, Divider } from '@mui/material';
import CoffeeIcon from '@mui/icons-material/Coffee';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import CategoryIcon from '@mui/icons-material/Category';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import BlenderIcon from '@mui/icons-material/Blender';

import { useNavigate } from 'react-router-dom';

const MenuProductBar = () => {

    const navigate = useNavigate();

    return (

        <Container maxWidth="lg" sx={{ mt: 10 }}>

            
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'left', fontFamily: 'Kanit, sans-serif' }}>
                เมนูเครื่องดื่ม.
            </Typography>

           
            <Divider sx={{ mb: 2, borderWidth: '1px', borderColor: 'rgba(0, 0, 0, 0.2)' }} />

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 5 }}>

                <Box sx={{ textAlign: 'center' }}>
                    <IconButton onClick={() => navigate('/product/coffee')}>
                        <CoffeeIcon fontSize="large" />
                    </IconButton>
                    <Typography sx={{ fontFamily: 'Kanit, sans-serif' }}>กาแฟ</Typography>
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                    <IconButton onClick={() => navigate('/product/milk-cocao')}>
                        <LocalCafeIcon fontSize="large" />
                    </IconButton>
                    <Typography sx={{ fontFamily: 'Kanit, sans-serif' }}>นมสด / โกโก้</Typography>
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                    <IconButton onClick={() => navigate('/product/tea')}>
                        <EmojiFoodBeverageIcon fontSize="large" />
                    </IconButton>
                    <Typography sx={{ fontFamily: 'Kanit, sans-serif' }}>ชา / มัทฉะ</Typography>
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                    <IconButton onClick={() => navigate('/product/frappe')}>
                        <BlenderIcon fontSize="large" />
                    </IconButton>
                    <Typography sx={{ fontFamily: 'Kanit, sans-serif' }}>ปั่น</Typography>
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                    <IconButton onClick={() => navigate('/product/created')}>
                        <CategoryIcon fontSize="large" />
                    </IconButton>
                    <Typography sx={{ fontFamily: 'Kanit, sans-serif' }}>ครีเอท</Typography>
                </Box>

            </Box>

            
            <Divider sx={{ mb: 2, borderWidth: '1px', borderColor: 'rgba(0, 0, 0, 0.2)' }} />


        </Container>
    );
}

export default MenuProductBar