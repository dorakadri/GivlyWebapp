import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  DashboardRounded,
  ExpandLess,
  ExpandMore,
  HomeOutlined,
  StarBorder,
  TocRounded,
} from "@mui/icons-material";
import SettingsAccessibilityOutlinedIcon from "@mui/icons-material/SettingsAccessibilityOutlined";
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  ListItemAvatar,
  ListItemButton,
  ListSubheader,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { border, borderRadius, width } from "@mui/system";
import { motion } from "framer-motion";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Options = [
  {
    text: "your short cut ",
    icon: null,
  },

  {
    text: "home",
    icon: <HomeOutlined />,
  },
  {
    text: "diygeneration",
    icon: <HomeOutlined />,
  },
  {
    text: "your shortcut ",
    icon: null,
  },
  {
    text: "Users List",
    icon: <SettingsAccessibilityOutlinedIcon />,
  },
  {
    text: "Deliverer Management",
    icon: <SettingsAccessibilityOutlinedIcon />,
  },
  {
    text: "your shortcut ",
    icon: null,
  },
  {
    text: "Deliverer List ",
    icon: <SettingsAccessibilityOutlinedIcon />,
  },
  {
    text: "Add Deliverer ",
    icon: <SettingsAccessibilityOutlinedIcon />,
  },
];
const Sidebar = () => {
  const store = useSelector((state) => state?.users);
  const navigate = useNavigate();
  console.log(store.profile);
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("");
  const [isActive, setIsActive] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };
  const { pathname } = useLocation();


  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
  const sideCountainerVariant = {
    true: {
      width: "15rem",
    },
    false: {
      transition: {
        delay: 0.6,
      },
    },
  };
  const sidebarVariants = {
    true: {},
    false: {
      width: "5rem",
    },
  };

  const profileVariant = {
    true: {
      alignSelf: "center",
      width: "4rem",
    },

    false: {
      alignSelf: "flex-start",
      marginTop: "1rem",
      width: "3rem",
    },
  };
  const subheading ={
    true: {
    opacity:1
    },

    false: {
   opacity:0,
   display:"none"

    },

  }
  return (
    <motion.div
    data-open={open}

    
      initial={`${open}`}
      animate={`${open}`}
      variants={sideCountainerVariant}
      style={{
        backgroundColor: `grey`,
        color: "black",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={`${open}`}
        animate={`${open}`}
        variants={sidebarVariants}
        style={{
          width: "14rem",
          height: "90%",
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
          padding: "15px",
          margin: "10px",
          display: "flex",
          backgroundColor: "#ffffff4d",
          boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          backdropFilter: "blur( 3.5px )",
          WebkitBackdropFilter: "blur( 3.5px )",
          borderRadius: "10px",
          border: "1px solid rgba( 255, 255, 255, 0.18 )",
        }}
      >
        <Box
        
          sx={{ display: "flex",
          alignSelf: open ? "flex-end" : "center" }}
          onClick={handleToggle}
        >
        {open ?  <ArrowForwardIosRoundedIcon/> : <ArrowBackIosRoundedIcon />}
        </Box>
        <motion.div
          layout
          initial={`${open}`}
          animate={`${open}`}
          variants={profileVariant}
          style={{ display: "flex" }}
          transition={{ duration: 0 }}
        >
          <Avatar
            sx={{
              width: open ? "4rem" : "3rem",
              height: open ? "4rem" : "3rem",
              mb:'1rem'
            }}
            alt="your photo"
            src={store.profile?.profilePhoto}
          />
         
        </motion.div>
     
        <Box
  
       
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          {Options.map(({ text, icon } ,i ) => {
            if (!icon) {
              return (
                <Typography
                key={i}
                  sx={{ display: open ? "" : "none" }}
                  variant="overline"
                >
                  {text}
                </Typography>
              );
            }
            const lcText = text.includes(" ")
            ? text.toLowerCase().replace(/\s+/g, "")
            : text.toLowerCase();

            return (
              <Box key={text}
                sx={{ display: "flex",flexDirection: "column", width: "100%" }}
              >
                <ListItemButton
                   onClick={() => {
                    console.log(lcText);
                    navigate(`./${lcText}`);
                    setActive(lcText);
                  }}
                  
                  sx={{
                    display: "flex",
                    padding: "6px 10px 6px 10px",
                    alignItems: "center",
                    borderRadius: "10px",
                    mb:"1rem",

                    transition: "background-color 0s ease-in-out",
                    "&:hover": {
                      backgroundColor: "#ffffff4d",
                      boxShadow: "0 10px 32px 0 rgba( 31, 38, 135, 0.37 )",
                      backdropFilter: "blur( 5.5px )",
                      WebkitBackdropFilter: "blur( 5.5px )",
                      border: "1px solid rgba( 255, 255, 255, 0.18 )",
                      cursor: "pointer",
                    },
                    "&.active": {
                      backgroundColor: "#ffffff4d",
                      boxShadow: "0 10px 32px 0 rgba( 31, 38, 135, 0.37 )",
                      backdropFilter: "blur( 5.5px )",
                      WebkitBackdropFilter: "blur( 5.5px )",
                      border: "1px solid rgba( 255, 255, 255, 0.18 )",
                    },
                  }}

                  className={active.includes(lcText) ? "active" : ""}

                >
                  <Box  sx={{ marginRight: "0.5rem", marginTop: "6px" }}>{icon}</Box>
                  <motion.span variants={subheading}>{text}</motion.span>
                </ListItemButton>
              </Box>
            );
          })}
        </Box>
      </motion.div>
      
    </motion.div>
  );
};

export default Sidebar;
