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

import { useDispatch, useSelector } from "react-redux";
 import { useNavigate } from "react-router-dom";
 import { logoutAction } from "../../../../ReduxB/slices/users/usersSlices";
import AccountVerificationAlertWarning from "../Alerts/AccountVerificationAlertWarning";
import AccountVerificationSuccessAlert from "../Alerts/AccountVerificationSuccessAlert";
 
 
export default function Profilesimpleuser() {



   const navigate = useNavigate();
   
   //logout
   const dispatch = useDispatch();
  function handelLogout (){
     console.log("logout");
     dispatch(logoutAction());
     navigate("/");
  }
  const state = useSelector(state => state.users);
  const { userAuth, profile } = state;
  
  const account = useSelector(state => state?.accountVerification);
  const { loading, appErr, serverErr, token } = account;
//console.log(account)
//console.log( userAuth)
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

    { userAuth && !userAuth.isAccountVerified
  && <AccountVerificationAlertWarning />}
    {loading && <h2 className="text-center">Loading please wait...</h2>}
    {token && <AccountVerificationSuccessAlert />}
    {appErr || serverErr ? (
        <h2 className="text-center text-red-500">
          {serverErr} {appErr}
        </h2>
      ) : null}
    </Box >
  );
}