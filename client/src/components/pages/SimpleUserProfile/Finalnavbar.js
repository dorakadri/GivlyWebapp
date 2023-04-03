import {
  DarkModeOutlined,
  LightModeOutlined,
  Search,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

import React, { useState } from "react";

import { FiHome, FiMessageSquare } from "react-icons/fi";
import { FaForumbee } from "react-icons/fa";

import FlexBetween from "../../common/FlexBetween";
import logo from "../../../assets/images/logogivly.png";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from "../../../ReduxB/slices/users/usersSlices";
import { setMode } from "../../../ReduxB/slices/Themeglobal";


export default function Finalnavbar(data) {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handelLogout() {
    dispatch(logoutAction());
    navigate("/");
  }
  return (
  
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none"  }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <FlexBetween>
          <img src={logo} alt="Logo" style={{ width: "50px" }} />
          <FlexBetween
            backgroundColor="#ece9e6"
            borderRadius="20px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search" />

            <Search sx={{ color: "#b9b7b4" }} />
          </FlexBetween>
        </FlexBetween>
        <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
        <FlexBetween sx={{ gap: "8px" }}>
       
          <IconButton component={Link} to="/user/home">
  <FiHome color="#9fa1a2" />
</IconButton>
          <IconButton>
            <FaForumbee  color="#9fa1a2" />
          </IconButton>
          <IconButton>
            <FiMessageSquare  color="#9fa1a2" />
          </IconButton>

         <Box  sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleClick}>
              <Avatar src={data?.profileurl}  color="#9fa1a2"  />
            </IconButton>
            </Tooltip>
            <Menu
               id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem   key="profile" onClick={() => navigate(`./profile`)}>      <Typography textAlign="center">Profile</Typography></MenuItem>
              <MenuItem  key="logout" onClick={handelLogout}><Typography textAlign="center">Logout</Typography></MenuItem>
            </Menu>
          </Box> 
        </FlexBetween>
      </Toolbar>
    </AppBar>

  );
}
