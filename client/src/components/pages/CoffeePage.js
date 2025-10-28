import React from 'react'
import { Container, Typography } from '@mui/material';
import ProductCoffee from '../home/ProductCoffee';


const CoffeePage = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 2 }}>

            {/* Section: Popular Drinks */}
            <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'left', fontFamily: 'Kanit, sans-serif' }}>
                กาแฟตาดีด !!
            </Typography>
            
            <ProductCoffee/>
        </Container>
    );
}

export default CoffeePage