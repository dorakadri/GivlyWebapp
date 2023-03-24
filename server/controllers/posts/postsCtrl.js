const Post = require('../../model/post/Posts');
const expressAsyncHandler = require("express-async-handler");

const validateMongodbId = require("../../utils/validateMongodbID");
const express = require("express");
const User = require('../../model/user/User');
const { post } = require('../../routes/posts/postsRoute');
const createPost = expressAsyncHandler(async (req, res) => {
  try {
    const post = await Post.create({
      userId: req?.body?.userId,
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      location: req?.body?.location,
      userPicture: req?.body?.userPicture,
      description: req?.body?.description,
      postPicture: req?.body?.postPicture,
      createdAt: req?.body?.createdAt,
      title: req?.body?.title,
      type: req?.body?.type,
    });
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

const fetchAllPost = expressAsyncHandler(async (req, res) => {
    try {
      const post= await Post.find({});
  
      res.json(post);
    } catch (error) {
      res.json(error);
    }
  });

  const removefromwishlist = expressAsyncHandler(async (req, res) => {
    try {
      const { userId, productId } = req.params;
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { wishlist: productId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json(user.wishlist);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  //Wishlist operations//

 const addtowishlist=expressAsyncHandler(async(req,res)=>{
  const { id } = req.params;
  const { _id } = req.body;
  
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $addToSet: { wishlist: _id } },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    return res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
 }) 

 const fetchbyid = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const post = await Post.findById(id);
    console.log( post);
    if ( post) {
      res.json( post);
    } else {
      res.status(404).json({ message: " post not found" });
    }
  } catch (error) {
    res.json(error);
  }
});



  

module.exports = {
    createPost ,
    fetchAllPost,
    addtowishlist,
    removefromwishlist,
    fetchbyid
  };
