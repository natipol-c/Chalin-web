import React from 'react'
import { Container, Typography, } from '@mui/material';
import ProductFrappe from '../home/ProductFrappe';


const FrappePage = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 2 }}>

            <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'left', fontFamily: 'Kanit, sans-serif' }}>
                เมนูปั่น
            </Typography>

            <ProductFrappe />
        </Container>
    );
}

export default FrappePage