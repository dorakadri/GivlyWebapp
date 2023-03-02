

import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,


} from "@mui/icons-material";
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme
} from "@mui/material";

import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import FlexBetween from "../../../common/FlexBetween";
import SettingsAccessibilityOutlinedIcon from '@mui/icons-material/SettingsAccessibilityOutlined';

const Options = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Users",
    icon: null,
  },
  {
    text: "Users Details",
    icon: <SettingsAccessibilityOutlinedIcon />,
  },
  {
    text: "Add user",
    icon: <PersonAddAlt1OutlinedIcon />,
  },
  {
    text: "Delivery",
    icon: null,
  },
  {
    text: "deliverer management ",
    icon: <LocalShippingOutlinedIcon />,
  },
  {
    text: "Sponsors",
    icon: null,
  },
  {
    text: "Gifts management  ",
    icon: <CardGiftcardOutlinedIcon  />,
  },
];

export default function Sidebar({
  Desktop,
  sidebarWidth,
  sidebaropen,
  setSidebarOpen,
}) {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {sidebaropen && (
        <Drawer
          open={sidebaropen}
          onClose={() => setSidebarOpen(false)}
          variant="persistent"
          anchor="left"
  
          sx={{
            width: sidebarWidth,

            "& .MuiDrawer-paper": {
              color: theme.palette.secondary.Text,
          
              background:theme.palette.background.alt,
              boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
         
              boxSizing: "border-box",
              borderWidth: Desktop ? 0 : "2px",
              width: sidebarWidth,
              },
            
          }}
     
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color="red">
                <Box display="flex" alignItems="center"  gap="0.5rem">
              
                  <Typography pl="2rem" variant="h4">Givly Admin</Typography>

                </Box>
                {!Desktop && (
                  <IconButton onClick={() => setSidebarOpen(!sidebaropen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {Options.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 2rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text}  >
                  <ListItemButton
  onClick={() => {
    navigate(`/${lcText}`);
    setActive(lcText);
  }}
  sx={{
    backgroundColor: "transparent",
    color: theme.palette.secondary.Title,
    border: "none",
    borderRadius: "30px",
    "&.active": {
      background: " linear-gradient(to bottom, #0ca470, #2bd1a1)",
      color:"white",
     
      borderRadius: "8px",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      "&:hover": {
        backgroundColor: theme.palette.secondary[200],
      },
    },
  }}
  className={active === lcText ? "active" : ""}
>
  <ListItemIcon
    sx={{
       

      ml: "0rem",
      color:
        active === lcText
          ?"white"
          : "grey",
    }}
  >
    {icon}
  </ListItemIcon>
  <ListItemText primary={text} />
  {active === lcText && (
    <ChevronRightOutlined sx={{ ml: "auto" }} />
  )}
</ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
       
        </Drawer>
      )}
    </Box>
  );
}
