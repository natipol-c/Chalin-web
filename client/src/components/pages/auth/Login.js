import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

// functions
import { login, loginFacebook } from "../../../functions/auth";
import { login as loginRedux } from "../../../store/userSlice";

// login line
import liff from "@line/liff";
// login facebook
import FacebookLogin from "@greatsumini/react-facebook-login";
import { BsFacebook, BsLine } from "react-icons/bs";

const defaultTheme = createTheme();

export default function Login() {
  const navi = useNavigate();
  const dispatch = useDispatch();

  const handleRegisterClick = () => {
    navi("/register");
  };

  useEffect(() => {
    liff.init({ liffId: "2006450969-0A7M1mB8" });
  }, []);

  const handleLoginLiff = () => {
    try {
      liff.login();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const tam = {
      email: data.get("email"),
      password: data.get("password"),
    };

    login(tam)
      .then((res) => {
        console.log(res.data.payload.user.email);
        toast.success("User " + res.data.payload.user.email + " Login Success", {
          position: "top-right",
          theme: "dark",
        });
        dispatch(
          loginRedux({
            email: res.data.payload.user.email,
            role: res.data.payload.user.role,
            displayName: res.data.payload.user.displayName,
            ip: res.data.payload.user.ip,
            _id: res.data.payload.user._id,
            orderCount: res.data.payload.user.orderCount,
            token: res.data.token,
          })
        );
        localStorage.setItem("token", res.data.token);
        roleRedirects(res.data.payload.user.role);
      })
      .catch((err) =>
        toast.error(err.response.data, {
          position: "top-left",
          theme: "dark",
        })
      );
  };

  const roleRedirects = (role) => {
    if (role === "admin") {
      navi("/admin/index");
    } else {
      navi("/");
    }
  };

  const handleFacebookSuccess = async (response) => {
    console.log("Facebook Login Success:", response);

    try {
      const res = await loginFacebook(response);
      console.log(res);
      toast.success(
        "User " + res.data.payload.user.displayName + " Login Success",
        {
          position: "top-right",
          theme: "dark",
        }
      );

      dispatch(
        loginRedux({
          email: res.data.payload.user.email,
          role: res.data.payload.user.role,
          displayName: res.data.payload.user.displayName,
          ip: res.data.payload.user.ip,
          _id: res.data.payload.user._id,
          orderCount: res.data.payload.user.orderCount,
          token: res.data.token,
        })
      );
      localStorage.setItem("token", res.data.token);
      roleRedirects(res.data.payload.user.role);
    } catch (err) {
      console.error("Facebook Login Error:", err);
      toast.error("Facebook login failed", {
        position: "top-right",
        theme: "dark",
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(/assets/loginBG.PNG)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          container
          item
          xs={12}
          sm={8}
          md={6}
          justifyContent="center"
          alignItems="center"
          sx={{ backgroundColor: "background.paper", height: "100vh", padding: 4 }}
        >
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            component={Paper}
            elevation={6}
            square
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 4,
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Avatar sx={{ width: "50%", height: "50%" }} src="/assets/logoChlin.png" />
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
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      width: "70%",
                      height: "45px",
                      fontSize: "16px",
                      backgroundColor: "black",
                      color: "white",
                      mb: 2,
                      fontWeight: "bold",
                      borderRadius: "20px",
                      fontFamily: "Kanit, sans-serif",
                      mt: 3,
                    }}
                  >
                    เข้าสู่ระบบ
                  </Button>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Button
                    onClick={handleLoginLiff}
                    color="black"
                    startIcon={<BsLine size={40} />}
                    sx={{ marginRight: 2 }}
                  />

                  <FacebookLogin
                    appId="3750182321870699"
                    onSuccess={handleFacebookSuccess}
                    onFail={(error) => console.error("Login Failed:", error)}
                    onProfileSuccess={(response) =>
                      console.log("Get Profile Success:", response)
                    }
                    render={({ onClick }) => (
                      <Button
                        onClick={onClick}
                        color="black"
                        startIcon={<BsFacebook size={40} />}
                        sx={{ marginLeft: 2 }}
                      />
                    )}
                  />
                </Box>

                <Grid container justifyContent="center" sx={{ marginTop: "20px" }}>
                  <Grid item>
                    <Typography variant="body2" align="center" sx={{ fontWeight: "bold" }}>
                      หากยังไม่มีบัญชี &nbsp;
                      <Box
                        component="span"
                        onClick={handleRegisterClick}
                        sx={{ cursor: "pointer" }}
                      >
                        <Link variant="body2" sx={{ fontWeight: "bold", color: "red" }}>
                          สมัครใช้งาน
                        </Link>
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
