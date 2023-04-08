
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
import { Box, Button,} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useDispatch, useSelector } from "react-redux";

import DateFormatter from "../../../utils/DateFormatter";
import { Stack } from "@mui/system";
const PostsForumList = () => {


  const postForum = useSelector(state => state?.postForum);
  const { postLists, likes, dislikes } = postForum;

  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
  const [isdisLiked, setIsdisLiked] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  //dispatch
  const dispatch = useDispatch();
  //fetch post
  useEffect(() => {
    dispatch(fetchPostsAction(""));
  }, [dispatch, likes, dislikes]);

  return (

    <Box  sx={{margin:"auto" ,pt:"39px"}}>
        
       
 
          {postLists?.map((postForum) => (
       
              <Card  spacing={10} key={postForum?.id} sx={{mb:"2rem",maxwidth:"700px"}} >
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
                <CardActions    sx={{
                      
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                    <Box   sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                    <IconButton aria-label="Like" onClick={() =>
                          {
                            dispatch(toggleAddLikesToPost(postForum?._id))
                            setIsLiked(etat => !etat);
                            setIsdisLiked(false);
                  
                        }
                        }>
                      <ThumbUpIcon
                       color={isLiked ?  "grey" : "info"   }
                       
                      />
                    </IconButton>
                 

                    <Typography color="text.secondary">
                      {" "}
                      {postForum?.likes?.length}
                    </Typography>
                    </Box>
                    <Box   sx={{
                      display: "flex",
                  
                      alignItems: "center",
                    }}>
                    <IconButton aria-label="disLike"    
                     onClick={() =>
                         { 
                          dispatch(toggleAddDisLikesToPost(postForum?._id))
                          setIsdisLiked(etat => !etat);
                          setIsLiked(false);
                     
                        }
                        }>
                      <ThumbDownIcon
                       color={isdisLiked ? "secondary" :"grey"  }
                    
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
                
                      alignItems: "center",
                  
                    }}
                  >
                         <IconButton aria-label="disLike">
                    <VisibilityIcon fontSize="small" color="primary" /></IconButton>
                    <Typography color="text.secondary" sx={{ pr: "8px" }}>
                      {postForum?.numViews}
                    </Typography>
                  </Box>
                  <Button sx={{ ml: "auto" }} aria-label="Comment">
                    <Link
                      to={`./posts/${postForum?._id}`}
                      className="text-indigo-500 hover:underline"
                    >
                      <Typography variant="body2" color="text.secondary">
                        {" "}
                       Comments
                      </Typography>
                    </Link>
                  </Button>{" "}
                </CardActions>
              </Card>
         
          ))}

      </Box>
  );
};
export default PostsForumList;