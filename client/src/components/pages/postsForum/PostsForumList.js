
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ForumIcon from "@mui/icons-material/Forum";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useEffect } from "react";
import { Visibility as VisibilityIcon } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CreatePostForum from "./CreatePostForum";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CreateIcon from "@mui/icons-material/Create";
const PostsForumList = () => {
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Card sx={{ maxWidth: 500 }}>
      <Button variant="contained" color="success" onClick={handleOpen}>
        Add a post
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <CreatePostForum />
          </Box>
        </Fade>
      </Modal>
      {data.map((postforum) => (
        <Grid spacing={8} key={postforum.id}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="esm user"
            subheader=""
          />
          <CardContent>
            <Typography
              variant="h5"
              color="text.secondary"
              paddingBottom="0.5 rem"
            >
              {postforum.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {postforum.description}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            image={`${postforum.image}`}
            alt="Paella dish"
          />

          <CardActions>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton aria-label="Like">
                <ThumbUpIcon />
              </IconButton>
              <Typography> </Typography>

              <IconButton aria-label="disLike">
                <ThumbDownIcon />
              </IconButton>

              <Typography> </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                ml: "1rem",
              }}
            >
              <IconButton aria-label="Comment" onClick={handleExpandClick}>
                <ForumIcon />
              </IconButton>
              <Typography></Typography>
            </Box>

            <IconButton sx={{ ml: "auto" }} aria-label="Comment"></IconButton>
            <VisibilityIcon fontSize="small" />
            <Typography sx={{ pr: "8px" }}>{postforum.numViews}</Typography>
            <IconButton aria-label="create">
              <CreateIcon />
            </IconButton>
          </CardActions>
        </Grid>
      ))}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <Typography
                    sx={{ display: "inline" }}
                    variant="body2"
                    color="text.primary"
                  >
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Beatae, eius atque aliquid quod in tempore veritatis
                    excepturi dolore maiores odit, omnis, ea quas cupiditate
                    hic. Sed molestiae vel amet exercitationem!
                  </Typography>
                }
              />
            </ListItem>

            <Divider variant="inset" component="li" />
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default PostsForumList;