import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "../../../common/FlexBetween";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { setMode } from "../state";
import { useTheme } from "@emotion/react";
import { AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { logoutAction } from "../../../../ReduxB/slices/users/usersSlices";
export default function Navbar({
    sidebaropen,
    setSidebarOpen ,
}) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const store = useSelector( state => state?.users.userAuth);
  const navigate = useNavigate();

console.log(store)

 function handelLogout (){

    dispatch(logoutAction());
    navigate("/");
 }

  return <AppBar 
  sx={{ position: "static",background:"none",boxShadow:"none" }}>
     <Toolbar sx={{justifyContent:"space-between"}}>
      <FlexBetween>
        <IconButton onClick={()=> setSidebarOpen(!sidebaropen)}>
            <MenuIcon/>
        </IconButton>
        <FlexBetween    backgroundColor={theme.palette.background.alt}
         borderRadius="9px" gap="3rem" p="0.1rem 1.5rem"
         >
            <InputBase placeholder="Search"/>
            <IconButton>
                <Search/>
            </IconButton>

        </FlexBetween>
      </FlexBetween>
      <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={store.profilePhoto}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary.Title }}
                >
                { store.firstName}   { store.lastName}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                 Admin
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary.Title, fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handelLogout}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
     </Toolbar>
  </AppBar>;
}
