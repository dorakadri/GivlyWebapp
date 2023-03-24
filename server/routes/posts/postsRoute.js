const express = require("express");

const{
    createPost ,
    fetchAllPost,
    addtowishlist,
    removefromwishlist,
    fetchbyid
}= require("../../controllers/posts/postsCtrl");
const { GiftImgResize } = require("../../middlewares/uploads/profilePhotoUpload");

const postRoutes = express.Router();


postRoutes.post("/",GiftImgResize,createPost);
postRoutes.get("/",  fetchAllPost);
postRoutes.get("/:id",fetchbyid);


//wishlist operation//

postRoutes.post("/:id/wishlist",addtowishlist);
postRoutes.delete("/:userId/wishlist/:productId",removefromwishlist);


module.exports = postRoutes;



