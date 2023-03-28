const express = require("express");

const{
    createPost ,
    fetchAllPost,
    addtowishlist,
    removefromwishlist,
    fetchbyid,
    addMatch,
    getUserMatches
}= require("../../controllers/posts/postsCtrl");
const { GiftImgResize } = require("../../middlewares/uploads/profilePhotoUpload");

const postRoutes = express.Router();


postRoutes.post("/",GiftImgResize,createPost);
postRoutes.get("/",  fetchAllPost);
postRoutes.get("/:id",fetchbyid);


//wishlist operation//

postRoutes.post("/:id/wishlist",addtowishlist);
postRoutes.delete("/:userId/wishlist/:productId",removefromwishlist);
//addmatch
postRoutes.post('/matches', addMatch);
postRoutes.get('/getmatches/:id',getUserMatches);

module.exports = postRoutes;



