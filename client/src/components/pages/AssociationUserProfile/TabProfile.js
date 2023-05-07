import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
//import { red } from "@mui/material/colors";
import { useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  fetchPostsAction,
  toggleAddLikesToPost,
  toggleAddDisLikesToPost,
} from "../../../ReduxB/slices/postsForum/postForumSlices";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useDispatch, useSelector } from "react-redux";

import DateFormatter from "../../../utils/DateFormatter";
import PostForumDetails from "../postsForum/PostForumDetails";
function capitalizeFirstLetter(str) {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}
const TabProfile = () => {
  const postForum = useSelector((state) => state?.postForum);
  const { postLists, likes, dislikes } = postForum;

  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
  const [isdisLiked, setIsdisLiked] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [editingPost, setEditingPost] = React.useState(null);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClosedelete = () => {
    setOpen(false);
    dispatch(fetchPostsAction(""));
  };
  const handleDetail = (id) => {
    setEditingPost(id);
    setOpen(true);
  };
  //dispatch
  const dispatch = useDispatch();
  //fetch post
  useEffect(() => {
    dispatch(fetchPostsAction(""));
  }, [dispatch, likes, dislikes]);

  return (
    <Box sx={{ margin: "auto" }}>
      {postLists &&
        [...postLists, ...postLists]
          ?.filter((postForum) => postForum.user._id === user.userAuth._id)
          .map((postForum) => (
            <Card
              spacing={10}
              key={postForum?.id}
              sx={{
                mb: "2rem",
                maxwidth: "700px",
                boxShadow: " 0 1px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="recipe"
                    src={postForum?.user?.profilePhoto}
                  ></Avatar>
                }
                subheader={<DateFormatter date={postForum?.createdAt} />}
                title={`${capitalizeFirstLetter(
                  postForum?.user?.firstName
                )} ${capitalizeFirstLetter(postForum?.user?.lastName)}`}
                titleTypographyProps={{ fontWeight: 600 }}
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
                sx={{ width: "100%", height: "400px", objectFit: "contain" }}
              />
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    aria-label="Like"
                    onClick={() => {
                      dispatch(toggleAddLikesToPost(postForum?._id));
                    }}
                  >
                    <ThumbUpIcon color="primary" />
                  </IconButton>

                  <Typography color="text.secondary">
                    {" "}
                    {postForum?.likes?.length}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",

                    alignItems: "center",
                  }}
                >
                  <IconButton
                    aria-label="disLike"
                    onClick={() => {
                      dispatch(toggleAddDisLikesToPost(postForum?._id));
                    }}
                  >
                    <ThumbDownIcon color="disabled" />
                  </IconButton>

                  <Typography color="text.secondary">
                    {" "}
                    {postForum?.disLikes?.length}{" "}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",

                    alignItems: "center",
                  }}
                >
                  <IconButton aria-label="disLike">
                    <VisibilityIcon fontSize="small" color="primary" />
                  </IconButton>
                  <Typography color="text.secondary" sx={{ pr: "8px" }}>
                    {postForum?.numViews}
                  </Typography>
                </Box>
                <Button
                  sx={{ ml: "auto" }}
                  aria-label="Comment"
                  onClick={() => handleDetail(postForum?._id)}
                >
                  <Typography variant="body2" color="text.secondary">
                    {" "}
                    Comments
                  </Typography>
                </Button>{" "}
              </CardActions>
            </Card>
          ))}
      {editingPost && (
        <Dialog open={open} onClose={handleClose} fullWidth>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pr: "1rem",
              pl: "3rem",
              alignItems: "center",
            }}
          >
            <DialogTitle sx={{ flex: 1, textAlign: "center" }}>
              Post
            </DialogTitle>

            <IconButton onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>

          <Divider />
          <DialogContent sx={{ p: 0 }}>
            <PostForumDetails data={editingPost} close={handleClosedelete} />
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};
export default TabProfile;
