
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Link} from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect } from "react";
import { Visibility as VisibilityIcon } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import {
  fetchPostsAction,
  toggleAddLikesToPost,
  toggleAddDisLikesToPost,
} from "../../../ReduxB/slices/postsForum/postForumSlices";
import { Box,} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useDispatch, useSelector } from "react-redux";

import DateFormatter from "../../../utils/DateFormatter";
const PostsForumList = () => {


  const postForum = useSelector(state => state?.postForum);
  const { postLists, likes, dislikes } = postForum;

  const user = useSelector((state) => state?.users);
  const { userAuth } = user;

  //dispatch
  const dispatch = useDispatch();
  //fetch post
  useEffect(() => {
    dispatch(fetchPostsAction(""));
  }, [dispatch, likes, dislikes]);

  return (
    <Box spacing={10}>
     
      <Box display="flex" justifyContent="center" spacing={10}>
        <Card sx={{ maxWidth: 500 }} spacing={10}>
          {postLists?.map((postForum) => (
            <Box key={postForum?.id} mb={2}>
              {" "}
         
              <Card spacing={10}>
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ bgcolor: red[600] }}
                      aria-label="recipe"
                      src={postForum?.user?.profilePhoto}
                    ></Avatar>
                  }
                  subheader={<DateFormatter date={postForum?.createdAt} />}
                  title={`${postForum?.user?.firstName} ${postForum?.user?.lastName}`}
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
                        color="primary"
                        onClick={() =>
                          dispatch(toggleAddLikesToPost(postForum?._id))
                        }
                      />
                    </IconButton>

                    <Typography color="text.secondary">
                      {" "}
                      {postForum?.likes?.length}
                    </Typography>

                    <IconButton aria-label="disLike">
                      <ThumbDownIcon
                        color="secondary"
                        onClick={() =>
                          dispatch(toggleAddDisLikesToPost(postForum?._id))
                        }
                      />
                    </IconButton>

                    <Typography color="text.secondary">
                      {" "}
                      {postForum?.disLikes?.length}{" "}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      ml: "1rem",
                    }}
                  >
                    <VisibilityIcon fontSize="small" color="primary" />
                    <Typography color="text.secondary" sx={{ pr: "8px" }}>
                      {postForum?.numViews}
                    </Typography>
                  </Box>
                  <IconButton sx={{ ml: "auto" }} aria-label="Comment">
                    <Link
                      to={`./posts/${postForum?._id}`}
                      className="text-indigo-500 hover:underline"
                    >
                      <Typography variant="body2" color="text.secondary">
                        {" "}
                        Read More..
                      </Typography>
                    </Link>
                  </IconButton>{" "}
                </CardActions>
              </Card>
            </Box>
          ))}
        </Card>
      </Box>
    </Box>
  );
};
export default PostsForumList;