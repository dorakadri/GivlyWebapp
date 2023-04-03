import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";
import Homepage from "./homecomponent/Homepage";
import { useTheme } from "@emotion/react";

export default function LayoutSidebar() {
  const theme = useTheme();
  return (
    <Box display={"flex"}>
      
        <Sidebar />
     
      <Box flex={1}>
        <Homepage />
      </Box>
    </Box>
  );
}
