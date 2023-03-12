import { Typography, useMediaQuery } from "@mui/material";
import { Box, width } from "@mui/system";
import React from "react";
import Loginform from "./Loginform";
import imagebg from "../landingcomponent/images/green3.jpg"
import RegisterDesign from "./RegisterDesign";
import { Link } from "react-router-dom";
import Spline from '@splinetool/react-spline';
export default function Signup() {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  return (
    <Box sx={{
        background: `url(${imagebg})`,
        height: "100vh",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
     
      
      <Box
        width={isNonMobileScreen ? "60%" : "93%"}
        pl="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        textAlign="center"
       display="flex"
        sx={{ backgroundColor: "white" }}
      >
        <Box sx={{p:"2rem"}} >
        <RegisterDesign />
        <Typography sx={{pt:"1rem"}}>
  Already have an account?{" "}
  <Link to="/login" style={{ textDecoration: "none" }}>
    Login
  </Link>
</Typography>
</Box>

<Spline scene="https://prod.spline.design/3CzEPispH4BB-fWu/scene.splinecode" />
      </Box>
  
    </Box>
  );
}
