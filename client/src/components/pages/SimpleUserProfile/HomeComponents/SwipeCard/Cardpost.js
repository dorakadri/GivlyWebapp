import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";

export default function Cardpost(props) {
  const [post, setPost] = useState(props.data);

  const handleWishlist = () => {
    props.onButtonClick("right");
  };

  const handlePass = () => {
    props.onButtonClick("left");
  };

  const handleTake = () => {
    props.onButtonClick("down");
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        userSelect: "none",
        borderRadius: 5,
        overflow: "hidden",
        borderColor: "transparent",
        px: "0.6rem",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"   src={post?.userPicture}/>

        }
        title={
          <Typography>
            {post.firstName} {post.lastName}{" "}
          </Typography>
        }
        subheader={post.createdAt}
      />
      <CardMedia
        component="img"
        height="194"
        image={post.postPicture}
        alt={post.postPicture}
        sx={{ pointerEvents: "none", borderRadius: "0.5rem" }}
      />
      <CardContent sx={{ pointerEvents: "none" }}>
        <Typography
          sx={{ pointerEvents: "none" }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {post.title}  
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ justifyContent: "space-around", mb: "1rem" }}
      >
        <IconButton
          aria-label="pass"
          size="large"
          id="pass"
          onClick={handlePass}
        >
          <CloseIcon color="error" />
        </IconButton>
        <IconButton
          id="take"
          aria-label="take"
          sx={{
            padding: "1rem",
            background: " linear-gradient(to right, #67b26f, #4ca2cd)",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
          onClick={handleTake}
        >
          <FavoriteIcon sx={{ color: "#fff" }} />
        </IconButton>
        <IconButton
          aria-label="wishlist"
          size="large"
          id="wishlist"
          onClick={handleWishlist}
        >
          <StarIcon color="info" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
