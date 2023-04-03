import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box, Card, Paper } from "@mui/material";
import Homepage from "./homecomponent/Homepage";
import { useTheme } from "@emotion/react";

export default function LayoutSidebar() {
  const theme = useTheme();
  return (
    <Box display={"flex"} sx={{ height: "calc(100vh - 66px)"}} >
      
        <Sidebar />
     
      
        <Outlet />
    
   
     
    </Box>
  );
}
