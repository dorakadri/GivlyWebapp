import {
  DarkModeOutlined,

  Search,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

import { FiHome, FiMessageSquare } from "react-icons/fi";
import { FaForumbee } from "react-icons/fa";

import FlexBetween from "../../common/FlexBetween";
import logo from "../../../assets/images/logogivly.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../../ReduxB/slices/users/usersSlices";
import { setMode } from "../Dashboard/state";

export default function Finalnavbar(data) {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  console.log(data);
  function handelLogout() {
    dispatch(logoutAction());
    navigate("/");
  }
  return (
    <AppBar sx={{ position: "static", background: "none", boxShadow: "none" }}>
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
        <IconButton>
          <DarkModeOutlined sx={{ fontSize: "25px" }} />
        </IconButton>
        <FlexBetween sx={{ gap: "8px" }}>
          <IconButton onClick={() => navigate(`./home`)}>
            <FiHome />
          </IconButton>
          <IconButton>
            <FaForumbee />
          </IconButton>
          <IconButton>
            <FiMessageSquare />
          </IconButton>

          <FlexBetween>
            <IconButton onClick={handleClick}>
              <Avatar src={data?.profileurl} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={() => navigate(`./profile`)}>Profile</MenuItem>
              <MenuItem onClick={handelLogout}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}
