const Post = require('../../model/post/Posts');
const expressAsyncHandler = require("express-async-handler");

const validateMongodbId = require("../../utils/validateMongodbID");
const express = require("express");
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
  

module.exports = {
    createPost ,
    fetchAllPost
  };
