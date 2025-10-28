import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

export default function NotFound404({ text }) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor:'white'
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h2"style={{ fontFamily: 'Kanit, sans-serif' }}>
                            <strong>กรุณาเข้าสู่ระบบ</strong>
                        </Typography><br/>
                        <Typography variant="h6"style={{ fontFamily: 'Kanit, sans-serif' }}>
                            {text}
                        </Typography>
                        <Link to={'/login'}>
                            <Button variant="contained"style={{ fontFamily: 'Kanit, sans-serif' }}>Go Login</Button>
                        </Link>
                    </Grid>
                    <Grid item xs={6}>
                        <img
                            src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                            alt=""
                            width={500} height={250}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
