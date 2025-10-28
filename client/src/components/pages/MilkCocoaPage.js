import React from 'react'
import { Container, Typography, } from '@mui/material';
import ProductMilkCocoa from '../home/ProductMilkCocoa';

const MilkCocoaPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>

      <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'left', fontFamily: 'Kanit, sans-serif' }}>
        นมสดและโกโก้
      </Typography>
      <ProductMilkCocoa />

    </Container>
  );
}

export default MilkCocoaPage