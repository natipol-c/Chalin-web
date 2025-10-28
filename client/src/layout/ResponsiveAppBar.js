import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';

import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LoginIcon from '@mui/icons-material/Login';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const pages = [
    { title: 'หน้าหลัก', icon: '', to: '/' },
    { title: 'เกี่ยวกับเรา', icon: '', to: '/contract' },
    { title: 'เมนูเครื่องดื่ม', icon: '', to: '/product' },
    { title: 'โปรโมชั่น', icon: '', to: '/promotion' },
    { title: 'สะสมคะแนน', icon: '', to: '/user/collect-points' },
    { icon: <ShoppingCartOutlinedIcon />, to: '/cart' },
];

const authen = [
    { title: 'Register', icon: <PeopleAltOutlinedIcon />, to: '/register' },
    { title: 'Login', icon: <LoginIcon />, to: '/login' }
];

const settings = [
    { title: 'Profile', icon: '', to: '/user/profile-user' },
    { title: 'Logout', icon: '', to: '#' }
];

function ResponsiveAppBar() {
    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleLogout = () => {
        dispatch(logout());
        handleCloseUserMenu();
        navigate('/');
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#CD1818' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* LOGO */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <IconButton>
                            <Avatar alt="Remy Sharp" src="/assets/logoAPP.png" sx={{ width: 80, height: 80 }} />
                        </IconButton>
                    </Typography>
                    {/* Minimize Menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Link to={page.to} style={{ textDecoration: 'none' }}>
                                        <Typography textAlign="center">
                                            {page.title}
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            ))}

                            {!user.user.token && authen.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Link to={page.to} style={{ textDecoration: 'none' }}>
                                        <Typography style={{ fontFamily: 'Kanit, sans-serif' }}>
                                            {page.title}
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Menu Left Full */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                        {pages.map((page, index) => (
                            <Link to={page.to} key={index}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        mr: page.icon && page.icon.type === ShoppingCartOutlinedIcon ? 0 : 5,
                                        ml: page.icon && page.icon.type === FavoriteBorderIcon ? -1 : 0,
                                    }}
                                    startIcon={page.icon}
                                >
                                    <Typography style={{ fontFamily: 'Kanit, sans-serif' }}>
                                        {page.title}
                                    </Typography>
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    {/* Menu Right Full */}
                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                        {!user.user.token && authen.map((page, index) => (
                            <Link to={page.to}>
                                <Button
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'white', mr: 2,
                                    }}
                                    startIcon={page.icon}
                                >
                                    <Typography style={{ fontFamily: 'Kanit, sans-serif' }}>
                                        {page.title}
                                    </Typography>
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    {/* User Menu */}
                    {user.user.token &&
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/assets/user01.png" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting, index) => (
                                    <MenuItem key={index} onClick={setting.title === 'Logout' ? handleLogout : handleCloseUserMenu}>
                                        <Link to={setting.to} style={{ textDecoration: 'none' }}>
                                            <Typography textAlign="center">{setting.title}</Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
