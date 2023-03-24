import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  deletePostAction,
  fetchPostDetailsAction,
} from "../../redux/slices/posts/postSlices";
import { useDispatch, useSelector } from "react-redux";
import DateFormatter from "../../utils/DateFormatter";

import AddComment from "../Comments/AddComment";
import CommentsList from "../Comments/CommentsList";

const PostDetails = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();
 const navigate = useNavigate();
  //select post details from store
  const postForum = useSelector((state) => state?.postForum);
  const { postforum, loading, appErr, serverErr, isDeleted } = postForum;

  //comment
  const comment = useSelector((state) => state.comment);
  const { commentCreated, commentDeleted } = comment;
  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [id, dispatch, commentCreated, commentDeleted]);

  //Get login user
  const user = useSelector((state) => state.users);
  const { userAuth } = user;

  const isCreatedBy = postforum?.user?._id === userAuth?._id;
  console.log(isCreatedBy);
  //redirect
  if (isDeleted) return navigate("/forum");
  return (
    <Card sx={{ maxWidth: 500 }}>
   
    
      {data.map((postforum) => (
        <Grid spacing={8} key={postforum.id}>
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
                src={postforum?.user?.profilePhoto}
              ></Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={postforum?.user?.firstName}
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