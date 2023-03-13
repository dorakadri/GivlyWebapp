import {
    ArrowDropDownOutlined,
    DarkModeOutlined,
    Search,
    SettingsOutlined,
  } from "@mui/icons-material";
  import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    IconButton,
    InputBase,
    Link,
    Toolbar,
    Typography,
  } from "@mui/material";
  import { borderRadius } from "@mui/system";
  import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../../../ReduxB/slices/users/usersSlices";





  export default function PrivateNavbar() {
  
console.log("hello")

  const navigate = useNavigate();
  
 
  const dispatch = useDispatch();
 function handelLogout (){
    console.log("logout");
    dispatch(logoutAction());
    navigate("/");
 }

    return (
      <Box sx={{ display: "flex" }}>
        
        <CssBaseline />
        <AppBar
          component="nav"
          sx={{
            position: "static",
            background: "none",
            boxShadow: "none",
            p: "1rem",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Givly
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: "5rem" }}>
              <Button sx={{ color: "black", px: "1rem", py: "0.5rem" }}>
                ABOUT US
              </Button>
              <Button sx={{ color: "black", px: "1rem", py: "0.5rem" }}>
                {" "}
                OUR PARTNER{" "}
              </Button>
              <Button sx={{ color: "black", px: "1rem", py: "0.5rem" }}>
                sarra
              </Button>
              <Button
              
               
                  onClick={handelLogout}
                sx={{
                  color: "white",
                  px: "1rem",
                  py: "0.5rem",
                  borderRadius: "30px",
                  backgroundColor: "#06A696",
                  "&:hover": {
                    color: "black",
                    backgroundColor: "#38BC73",
                  },
                }}
              >
                {" "}
                Logout
              </Button>
            
            
             
            
          </Box>
        </Toolbar>
      </AppBar>
      <Typography>Association</Typography>
      </Box >
    );
  }
