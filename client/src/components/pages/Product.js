import React from 'react';
import { Container, Typography, } from '@mui/material';

import ProductNew from '../home/ProductNew';


const Product = () => {

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>

      <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'left', fontFamily: 'Kanit, sans-serif' }}>
        เครื่องดื่มยอดนิยม ! ⭐⭐⭐
      </Typography>
      <ProductNew />

    </Container>
  );
};

export default Product;
