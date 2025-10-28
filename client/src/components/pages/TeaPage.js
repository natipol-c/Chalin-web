import React from 'react'
import { Container, Typography, } from '@mui/material';
import ProductTea from '../home/ProductTea';

const TeaPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>

      <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'left', fontFamily: 'Kanit, sans-serif' }}>
        ชาและมัทฉะ
      </Typography>

      <ProductTea />
    </Container>
  );
}

export default TeaPage