import { Box } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function LayoutSidebar() {
  return (
    <Box display={"flex"} >
      <Box sx={{  height: "calc(100vh - 64px)", width: "30%" }}>
       <Sidebar/>
      </Box>
      <Outlet />
    </Box>
  );
}
