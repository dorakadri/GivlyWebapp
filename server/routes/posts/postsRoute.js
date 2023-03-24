const express = require("express");

const{
    createPost ,
    fetchAllPost
}= require("../../controllers/posts/postsCtrl");
const { GiftImgResize } = require("../../middlewares/uploads/profilePhotoUpload");

const postRoutes = express.Router();


postRoutes.post("/",GiftImgResize,createPost);
postRoutes.get("/",  fetchAllPost);


module.exports = postRoutes;



