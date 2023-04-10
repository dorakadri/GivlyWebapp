import React from "react";
import { Outlet } from "react-router-dom";

import { Box, Card, Paper } from "@mui/material";

import { useTheme } from "@emotion/react";
import Sidebar from "./Sidebar";
import { height } from "@mui/system";

export default function LayoutSidebar() {
  const theme = useTheme();
  return (
    <Box display={"flex"  }  >
      
      <Box sx={{height: "calc(100vh - 66px)"}}  >
    <Sidebar />
    </Box>
      
        <Outlet />
    
   
     
    </Box>
  );
}
