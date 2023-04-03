import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchuserPostsAction } from "../../../../ReduxB/slices/posts/mainPostsSlice";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VerifiedIcon from '@mui/icons-material/Verified';
export default function PostsList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchuserPostsAction());
  }, [dispatch]);

  const { usersposts, isLoading, error } = useSelector(
    (state) => state?.mainpost
  );

  console.log(usersposts);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user posts</div>;
  }

  return (
    <div>
             <Grid container >
      {usersposts?.map((post) => (
         <Grid key={post?._id} item xs={12} md={4} xl={4} style={{padding:"1rem  1rem"}}>
        <Card sx={{ maxWidth: 345 }} >
          <CardHeader
            avatar={<Avatar alt="ownerphoto" src={post?.userId.profilePhoto} />}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={`${post?.userId.firstName} ${post?.userId.lastName}`}
            subheader={new Date(post.createdAt).toLocaleDateString()}

          />
          <CardMedia
            component="img"
            height="194"
           
            image={post.postPicture}
            alt="Paella dish"
       
          />
           
          <CardContent sx={{display:"flex" ,justifyContent:"space-between"}}>
        
            <div>
          <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.description}
            </Typography>
            </div>
            {post.isTaken && (
            
                <VerifiedIcon  color="primary" />
         
            )}
          </CardContent>
        </Card>
        </Grid>
      ))}
      </Grid>
    </div>
  );
}
