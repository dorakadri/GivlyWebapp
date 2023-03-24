
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
import { Link} from "react-router-dom";
import ForumIcon from "@mui/icons-material/Forum";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useEffect } from "react";
import { Visibility as VisibilityIcon } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import {
  fetchPostsAction,
  toggleAddLikesToPost,
  toggleAddDisLikesToPost,
} from "../../../ReduxB/slices/postsForum/postForumSlices";
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
import { useDispatch, useSelector } from "react-redux";
const PostsForumList = () => {


  const postForum = useSelector(state => state?.postForum);
  const { postLists, loading, appErr, serverErr, likes, dislikes } = postForum;



  //dispatch
  const dispatch = useDispatch();
  //fetch post
  useEffect(() => {
    dispatch(fetchPostsAction(""));
  }, [dispatch, likes, dislikes]);

  return (
    <Card sx={{ maxWidth: 1000 }}>
      {postLists?.map((postForum) => (
        <Grid spacing={10} key={postForum?.id}>
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[600] }}
                aria-label="recipe"
                src={postForum?.user?.profilePhoto}
              ></Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title=""
            subheader={postForum?.user?.firstName}
          />
          <CardContent>
            <Typography
              variant="h4"
              color="text.secondary"
              paddingBottom="0.5 rem"
            >
              {postForum?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {postForum?.description}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            image={`${postForum?.image}`}
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
                <ThumbUpIcon
                  onClick={() => dispatch(toggleAddLikesToPost(postForum?._id))}
                />
              </IconButton>

              <Typography> {postForum?.likes?.length}</Typography>

              <IconButton aria-label="disLike">
                <ThumbDownIcon
                  onClick={() =>
                    dispatch(toggleAddDisLikesToPost(postForum?._id))
                  }
                />
              </IconButton>

              <Typography> {postForum?.disLikes?.length} </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                ml: "1rem",
              }}
            >
              <VisibilityIcon fontSize="small" />
              <Typography sx={{ pr: "8px" }}>{postForum?.numViews}</Typography>
            </Box>
            <IconButton sx={{ ml: "auto" }} aria-label="Comment">
              <Link
                to={`/posts/${postForum?._id}`}
                className="text-indigo-500 hover:underline"
              >
                <Typography variant="body2" color="text.secondary">
                  {" "}
                  Read More..
                </Typography>
              </Link>
            </IconButton>{" "}
          </CardActions>
        </Grid>
      ))}
    </Card>
  );
};
export default PostsForumList;