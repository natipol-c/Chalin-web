import React, { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Divider } from 'antd';
import ProductCreated from '../home/ProductCreated';

const CreatedPage = () => {
  const [selectedCup, setSelectedCup] = useState(null); 
  const [selectedProcess, setSelectedProcess] = useState(null); 

  const handleCupSelect = (product) => {
    setSelectedCup(product);
  };

  const handleProcessSelect = (product) => {
    setSelectedProcess(product);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'left', fontFamily: 'Kanit, sans-serif' }}>
        สนุกกับการสร้างเมนูด้วยตัวเอง
      </Typography>
      <br /><br />
      <Container>
        <Container>
          <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'left', fontFamily: 'Kanit, sans-serif' }}>
            ขั้น 1 เลือกขนาดแก้ว
          </Typography>

          <ProductCreated
            showGridCup={true}
            onProductSelect={handleCupSelect}
            isDisabled={!!selectedCup}
          />
          <br />
          <Divider sx={{ mb: 2, borderWidth: '1px', borderColor: 'rgba(0, 0, 0, 0.5)' }} />

          <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'left', fontFamily: 'Kanit, sans-serif' }}>
            ขั้น 2 เทคนิคการชง
          </Typography>

          <ProductCreated
            showGridProcess={true}
            onProductSelect={handleProcessSelect}
            isDisabled={!!selectedProcess}
          />
          <br />
          <Divider sx={{ mb: 2, borderWidth: '1px', borderColor: 'rgba(0, 0, 0, 0.5)' }} />

          <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'left', fontFamily: 'Kanit, sans-serif' }}>
            ขั้น 3 ส่วนผสม
          </Typography>

          <ProductCreated
            showGridIngredient={true}
          />
          <br />
          <Divider sx={{ mb: 2, borderWidth: '1px', borderColor: 'rgba(0, 0, 0, 0.5)' }} />

          <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'left', fontFamily: 'Kanit, sans-serif' }}>
            ขั้น 4 Topping
          </Typography>

          <ProductCreated
            showGridTopping={true}
          />
        </Container>
      </Container>
    </Container>
  );
}

export default CreatedPage;
