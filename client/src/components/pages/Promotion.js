import React from 'react';
import { Box, Grid, CardMedia, Container, Divider } from '@mui/material';

const Promotion = () => {
  const promotions = [
    { src: '/assets/promotion00.png', alt: 'Promotion 1' },
    { src: '/assets/promotion5.png', alt: 'Buy 1 Get 1' },
    { src: '/assets/promotion6.png', alt: 'Collect Points' },
    { src: '/assets/promotion4.png', alt: 'Happy Birthday' },
    { src: '/assets/promotion8.png', alt: 'Buy 4 Pay 3' },
    { src: '/assets/promotion7.png', alt: 'Discount 5 Baht' },
  ];

  return (
    <Box sx={{ padding: '20px' }}>
      <br /><br />
      <Container>
        <h2 style={{ textAlign: 'left', fontFamily: 'Kanit, sans-serif' }}>
          <strong>โปรโมชั่น</strong>
        </h2>
        <Divider sx={{ mb: 2, borderWidth: '1px', borderColor: 'rgba(0, 0, 0, 0.5)' }} />
        <br /><br />
        
        <Grid container spacing={2}>
          {/* รูปที่ 1 */}
          <Grid item xs={12}>
            <CardMedia
              component="img"
              image={promotions[0].src}
              alt={promotions[0].alt}
              sx={{ width: '100%', borderRadius: '8px' }}
            />
          </Grid>

          {/* รูปที่ 2 และ 3 ในบรรทัดเดียวกัน */}
          <Grid item xs={6}>
            <CardMedia
              component="img"
              image={promotions[1].src}
              alt={promotions[1].alt}
              sx={{ width: '100%', borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <CardMedia
              component="img"
              image={promotions[2].src}
              alt={promotions[2].alt}
              sx={{ width: '100%', borderRadius: '8px' }}
            />
          </Grid>

          {/* รูปที่ 4 */}
          <Grid item xs={12}>
            <CardMedia
              component="img"
              image={promotions[3].src}
              alt={promotions[3].alt}
              sx={{ width: '100%', borderRadius: '8px' }}
            />
          </Grid>

          {/* รูปที่ 5 และ 6 ในบรรทัดเดียวกัน */}
          <Grid item xs={6}>
            <CardMedia
              component="img"
              image={promotions[4].src}
              alt={promotions[4].alt}
              sx={{ width: '100%', borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={6}>
            <CardMedia
              component="img"
              image={promotions[5].src}
              alt={promotions[5].alt}
              sx={{ width: '100%', borderRadius: '8px' }}
            />
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Promotion;
