import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {deletePostAction,fetchPostDetailsAction,} from "../../../ReduxB/slices/postsForum/postForumSlices";
import { useDispatch, useSelector } from "react-redux";
import { Box,} from "@mui/material";
import {Button } from "@material-ui/core";
import AddComment from "../Comments/AddComment";
import CommentsList from "../Comments/CommentsList";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Visibility as VisibilityIcon } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import CreateIcon from "@mui/icons-material/Create";
import { useParams } from "react-router-dom";
import { fetchPostsAction,} from "../../../ReduxB/slices/postsForum/postForumSlices";
import Navbar from "../SimpleUserProfile/Navbar";
import DateFormatter from "../../../utils/DateFormatter";
export default function PostForumDetails(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //select post details from store
  const postForum = useSelector((state) => state?.postForum);
  const {
    postDetails,
    isDeleted,
    likes,
    dislikes,
  } = postForum;

 

  //fetch post
  useEffect(() => {
    dispatch(fetchPostsAction(""));
  }, [dispatch, likes, dislikes]);

  //comment
  const comment = useSelector((state) => state.comment);
  const { commentCreated, commentDeleted } = comment;
  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [id, dispatch, commentCreated, commentDeleted]);

  //Get login user
  const user = useSelector((state) => state.users);
  const { userAuth } = user;

  const isCreatedBy = postDetails?.user?._id === userAuth?._id;
  console.log(isCreatedBy);
  //redirect
  if (isDeleted) return navigate("/forum");
  return (
    <Box>
      <Box flexGrow={4}>
        <Navbar profileurl={postForum?.user?.profilePhoto} />
      </Box>

      <Box display="flex" justifyContent="center">
        <Card sx={{ maxWidth: 700 }}>
          <Grid spacing={10}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: red[600] }}
                  aria-label="recipe"
                  src={postDetails?.user?.profilePhoto}
                ></Avatar>
              }
              subheader={<DateFormatter date={postDetails?.createdAt} />}
              title={`${postDetails?.user?.firstName} ${postDetails?.user?.lastName}`}
            />
            <CardContent>
              <Typography
                variant="h4"
                color="text.secondary"
                paddingBottom="0.5 rem"
              >
                {postDetails?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {postDetails?.description}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              image={`${postDetails?.image}`}
              alt="Paella dish"
            />

            <CardActions>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              ></Box>
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
                  {postDetails?.numViews}
                </Typography>
              </Box>
              <IconButton sx={{ ml: "auto" }} aria-label="Comment"></IconButton>{" "}
              {isCreatedBy ? (
                <p>
                  <Link to={`/update-post/${postDetails?._id}`}>
                    <IconButton aria-label="update">
                      <CreateIcon color="secondary" />
                    </IconButton>
                  </Link>

                  <Button
                    onClick={() => dispatch(deletePostAction(postDetails?._id))}
                    startIcon={<DeleteIcon />}
                    color="secondary"
                  ></Button>
                </p>
              ) : null}
            </CardActions>
          </Grid>

          <Box display="flex" justifyContent="center" alignItems="center">
            {userAuth && <AddComment postForumId={id} />}
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <CommentsList comments={postDetails?.comments} />
          </Box>
        </Card>
      </Box>
    </Box>
  );
};