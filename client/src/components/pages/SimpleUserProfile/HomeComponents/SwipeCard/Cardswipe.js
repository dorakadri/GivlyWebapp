import {  Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TinderCard from "react-tinder-card";
import { fetchPostsAction } from "../../../../../ReduxB/slices/posts/mainPostsSlice";
import Cardpost from "./Cardpost";



const useStyles = makeStyles({
  swipe: {
    position: "absolute",
  },
});
export default function Cardswipe() {

  const [lastDirection, setLastDirection] = useState();

  const [Posts, setPosts] = useState();
  const dispatch = useDispatch();

useEffect(() => {
  dispatch(fetchPostsAction());
  
}, [dispatch])

const { postLists, loading, appErr, serverErr } = useSelector(
  (state) => state.mainpost
);


useEffect(() => {
  setPosts(postLists);
}, [postLists]);

  const swiped = async (direction, thepost) => {
    setLastDirection(direction);
    if (direction === "down") {
     console.log("down")
    }
    setTimeout(() => {
      setPosts(Posts.filter((post) => post._id !== thepost._id));
    }, 100);
  };

  const cardRef = useRef(null);

  const handleButtonClick = async (buttonDirection) => {
    console.log(buttonDirection);
    await cardRef.current.swipe(buttonDirection);
  };

  const classes = useStyles();
  return (
    <Box style={{ overflow: "hidden" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {Posts?.map((p) => (
          <TinderCard
            ref={cardRef}
          className={classes.swipe}
            key={p._id}
            onSwipe={(dir) => swiped(dir, p)}
            preventSwipe={"down"}
          >
           <Cardpost data={p} onButtonClick={handleButtonClick} />
        
          </TinderCard>
        ))}
      </Box>
    </Box>
  );
}
