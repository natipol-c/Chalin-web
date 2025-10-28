import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const HeaderBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/');
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2} backgroundColor="White"> {/* เปลี่ยนสีพื้นหลังที่นี่ */}
      <Box display="flex"></Box>
 
      
      <Box display="flex">
        <IconButton onClick={handleMenu}>
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >

          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default HeaderBar;
