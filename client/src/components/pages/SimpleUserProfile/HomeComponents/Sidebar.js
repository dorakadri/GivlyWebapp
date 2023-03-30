import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ExpandLess, ExpandMore, HomeOutlined, StarBorder } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Avatar, Collapse, Divider, ListItemAvatar, ListItemButton, ListSubheader } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
    const store = useSelector((state) => state?.users);
const navigate=useNavigate();
    console.log(store.profile)
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
      setOpen(!open);
    };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    
        <List  >

        <ListItem button>
              <ListItemAvatar>
                <Avatar
                  alt="your photo"
                  src={store.profile?.profilePhoto
                  }
                />
              </ListItemAvatar>
              <ListItemText  primary={store.profile?.firstName +" " +store.profile?.lastName }  />
            </ListItem>
        <ListSubheader component="div" id="nested-list-subheader">
        Your shortcuts
        </ListSubheader>
        <ListItem button  onClick={()=>navigate("/user/Addpost")}>
            <ListItemIcon>
            <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary="Add post" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
            <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary="Wishlist" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
            <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary="Delivery" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
            <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary="Forum" />
          </ListItem>
          <Divider />
          <ListSubheader component="div" id="nested-list-subheader">
          Food Related features
        </ListSubheader>
          <ListItem button >
            <ListItemIcon>
            <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary="Generate recipes" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
            <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary="Find The Right Association Nearby" />
          </ListItem>
          <ListItem button onClick={handleClick}>
        <ListItemIcon>
            <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary="Composting" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div"  >
          <ListItemButton  sx={{ pl: 6 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Composting at home" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 6 }} >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Composting drop" />
          </ListItemButton>
        </List>
      </Collapse>
      <Divider />
      <ListSubheader component="div" id="nested-list-subheader">
          Object Related features
        </ListSubheader>
          <ListItem button   onClick={()=>navigate("./diygeneration")}>
            <ListItemIcon>
            <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary="Diy generation" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
            <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary="Association recommandation" />
          </ListItem>
     
        </List>
    </Box>
  );
};

export default Sidebar;
