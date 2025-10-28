import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// function
import { register } from "../../../functions/auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const tam = {
      email: data.get("email"),
      password: data.get("password"),
    };

    register(tam)
      .then((res) => {
        console.log(res);
        toast.success(res.data);
        navigate('/login');
      })
      .catch((err) => console.log(err));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh", position: 'relative' }}>
        <CssBaseline />
        <Box
          sx={{
            backgroundImage: `url(/assets/registerBG.PNG)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
          }}
        />
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100vh", padding: 4 }}
        >
          <Box
            component={Paper}
            elevation={6}
            square
            sx={{
              width: '90%',
              maxWidth: '400px',
              padding: 4,
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
              <Avatar sx={{ width: '50%', height: '50%' }} src="/assets/logoChlin.png" />
              <Typography variant="body2" align="center" sx={{ fontWeight: 'bold', fontFamily: 'Kanit, sans-serif' }}>
                สมัครเลย!  สร้างเมนูเครื่องดื่มในแบบคุณเอง<br />
                หรือเลือกจากเมนูร้านเรา ง่าย รวดเร็ว พร้อมส่งถึงมือ!
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoFocus
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      width: '70%',
                      height: '45px',
                      fontSize: '16px',
                      backgroundColor: 'black',
                      color: 'white',
                      mb: 2,
                      fontWeight: 'bold',
                      borderRadius: '20px',
                      fontFamily: 'Kanit, sans-serif',
                      mt:3
                    }}
                  >
                    สมัครใช้งาน
                  </Button>
                </Box>
                <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
                  <Grid item>
                    <Typography variant="body2" align="center" sx={{ fontWeight: 'bold', fontFamily: 'Kanit, sans-serif' }}>
                      มีบัญชีอยู่แล้ว ? &nbsp;
                      <Box component="span" onClick={handleLoginClick} sx={{ cursor: 'pointer' }}>
                        <Link variant="body2" sx={{ fontWeight: 'bold', color: 'red', fontFamily: 'Kanit, sans-serif' }}>
                          เข้าสู่ระบบ
                        </Link>
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
