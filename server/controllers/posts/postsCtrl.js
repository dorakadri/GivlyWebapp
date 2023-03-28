const Post = require('../../model/post/Posts');
const expressAsyncHandler = require("express-async-handler");
const validateMongodbId = require("../../utils/validateMongodbID");
const express = require("express");
const User = require('../../model/user/User');
const Match = require('../../model/user/Matches');
const createPost = expressAsyncHandler(async (req, res) => {
  try {
    const post = await Post.create({
      userId: req?.body?.userId,
      location: req?.body?.location,
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
      const post= await Post.find({}).populate('userId', 'firstName lastName profilePhoto');
  
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
  console.log( _id)
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
    const post = await Post.findById(id).populate("userId", "firstName lastName profilePhoto");;
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

//updateusermatches 
const addMatch = expressAsyncHandler(async (req, res) => {
  const { userId, postId, ownerId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: `User with id ${userId} not found` });
 
    }

    const userIds = user.matches.userId;
    const productIds = user.matches.productId;

    if (userIds.includes(ownerId) && productIds.includes(postId)) {
      res.json({ message: "Match already exists" });
       return
    }
    if (!userIds.includes(ownerId)) {
      user.matches.userId.push(ownerId);
    }

    if (!productIds.includes(postId)) {
      user.matches.productId.push(postId);
    }

    await user.save();

    res.json({ message: "Match added successfully" });
  } catch (error) {
    res.json(error);
  }
});







//getownerposts
const getUserMatches = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id)

    if (!user) {
      res.status(404).json({ message: `User with id ${id} not found` });
      return;
    }

    const userIds = user.matches.userId;
    const users = await User.find({ _id: { $in: userIds } }, 'firstName lastName profilePhoto');
    
    const matchedUsers = users.map(u => ({ 
      id: u._id, 
      firstName: u.firstName, 
      lastName: u.lastName,
      profilePhoto: u.profilePhoto 
    }));

    res.status(200).json(matchedUsers);
  } catch (error) {
    res.json(error);
  }
});



  

module.exports = {
    createPost ,
    fetchAllPost,
    addtowishlist,
    removefromwishlist,
    fetchbyid,
    addMatch,
    getUserMatches
  };
