import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Typography } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice'; 

const SideBarProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const { user } = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logout()); 
        navigate('/'); 
    };

    
    const handleRedirect = (e, path) => {
        e.preventDefault();
        if (user?.role !== 'user') {
            navigate('/login');
        } else {
            navigate(path);
        }
    };

    return (
        <div style={{ display: "flex", height: "auto" }}>
            <Sidebar
                style={{ height: "100%", width: '500px' }}
                backgroundColor={'white'}
            >
                <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    <div style={{ flex: 1, marginBottom: "32px" }}>
                        <br /><br /><br /><br />
                        <Menu iconShape="square">

                            
                            <MenuItem 
                                icon={<AccountCircleOutlinedIcon style={{ color: "#CD1818" }} />} 
                                style={{ paddingLeft: '240px' }} 
                                onClick={(e) => handleRedirect(e, '/user/profile-user')}
                            >
                                <Typography style={{ color: "black",fontFamily: 'Kanit, sans-serif'  }}>บัญชีของฉัน</Typography>
                            </MenuItem>
 
                            <MenuItem 
                                icon={<BadgeOutlinedIcon style={{ color: "#CD1818" }} />} 
                                style={{ paddingLeft: '240px' }} 
                                onClick={(e) => handleRedirect(e, '/user/collect-points')}
                            >
                                <Typography style={{ color: "black",fontFamily: 'Kanit, sans-serif' }}>คะแนนสะสม</Typography>
                            </MenuItem>

                            <Link to="/StatusOrder" className="menu-bars">
                                <MenuItem icon={<DeliveryDiningOutlinedIcon style={{ color: "#CD1818" }} />} style={{ paddingLeft: '240px' }}>
                                    <Typography style={{ color: "black",fontFamily: 'Kanit, sans-serif' }}>สถานะการสั่งซื้อ</Typography>
                                </MenuItem>
                            </Link>
                            
                            <Link to="/cart" className="menu-bars">
                                <MenuItem icon={<ShoppingCartOutlinedIcon style={{ color: "#CD1818" }} />} style={{ paddingLeft: '240px' }}>
                                    <Typography style={{ color: "black",fontFamily: 'Kanit, sans-serif' }}>รถเข็น</Typography>
                                </MenuItem>
                            </Link>

                            {user?.role === 'user' && (
                                <MenuItem 
                                    icon={<ExitToAppIcon style={{ color: "#CD1818" }} />} 
                                    style={{ paddingLeft: '240px' }} 
                                    onClick={handleLogout}  
                                >
                                    <Typography style={{ color: "black",fontFamily: 'Kanit, sans-serif' }}>ออกจากระบบ</Typography>
                                </MenuItem>
                            )}

                        </Menu>
                    </div>
                </div>
            </Sidebar>
        </div>
    );
};

export default SideBarProfile;
