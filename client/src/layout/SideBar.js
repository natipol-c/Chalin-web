import React, { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,

} from "react-pro-sidebar";
import { Box, IconButton, Typography, } from "@mui/material";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import TableViewIcon from '@mui/icons-material/TableView';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';

const SideBar = () => {
  const [isCollapsed, setisCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        image="/assets/IMG_2286.jpg"
        breakPoint="md"
        style={{ height: "100%" }}
        backgroundColor="#CD1818"
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <Menu iconShape="square">
              
              <MenuItem
                onClick={() => setisCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{
                  margin: "10px 0 20px 0",
                }}
              >
                {!isCollapsed && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                  >
                    <Typography style={{ color: "white" }}>CHLIN APP</Typography>
                    <IconButton onClick={() => setisCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon style={{ color: "Yellow" }} />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>
              {!isCollapsed && (
                <Box mb="25px">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img
                      alt="profile-user"
                      width="120px"
                      height="120px"
                      src={`/assets/logoAPP.png`}
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                  </Box>
                  <Box textAlign="center">
                    <Typography sx={{ m: "5px 0 0 0", color: "white" }}>ADMIN</Typography>
                    <Typography style={{ color: "white" }}>CHLIN APP</Typography>
                  </Box>
                </Box>
              )}

              <Link to="/admin/index" className="menu-bars">
                <MenuItem icon={<DashboardIcon style={{ color: "white" }} />}>  
                  <Typography style={{ color: "white" }}>Dashboard</Typography>
                </MenuItem>
              </Link>

              <Link to="/admin/accept-order" className="menu-bars">
                <MenuItem icon={<ListAltIcon style={{ color: "white" }} />}>  
                  <Typography style={{ color: "white" }}>Order</Typography>
                </MenuItem>
              </Link>



              <SubMenu icon={<AllInboxIcon style={{ color: "white" }} />} label={<Typography style={{ color: "white" }}>Product</Typography>}>
                <Link to={"/admin/viewtable"} className="menu-bars">
                  <MenuItem icon={<TableViewIcon style={{ color: "black" }} />}>
                    <Typography style={{ color: "black" }}>Add Product</Typography>
                  </MenuItem>
                </Link>
              </SubMenu>

              <SubMenu icon={<ManageAccountsIcon style={{ color: "white" }} />} label={<Typography style={{ color: "white" }}>Manage</Typography>}>
                <Link to={"/admin/manage"} className="menu-bars">
                  <MenuItem icon={<SupervisedUserCircleIcon style={{color:'black'}} />}>
                    <Typography style={{ color: "black" }}>User</Typography>
                  </MenuItem>
                </Link>
              </SubMenu>
            </Menu>
          </div>
        </div>
      </Sidebar>
      <main>
        <div style={{ padding: "16px 2px ", color: "#44596e" }}>
          <div style={{ marginBottom: "16px" }}>
            {broken && (
              <IconButton onClick={() => setToggled(!toggled)}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default SideBar;
