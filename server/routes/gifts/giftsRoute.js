const express = require("express");
const {
    createGiftCtrl,
    fetchAllGiftCtrl,
    deleteGiftCtrl,
    updateGiftCtrl,
} = require("../../controllers/gift/giftCtrl");
const { GiftImgResize, profilePhotoUpload } = require("../../middlewares/uploads/profilePhotoUpload");


const giftsRoutes = express.Router();

giftsRoutes.post("/",profilePhotoUpload.single("giftPhoto"),GiftImgResize, createGiftCtrl);

giftsRoutes.get("/", fetchAllGiftCtrl);

giftsRoutes.delete("/:id",  deleteGiftCtrl);

giftsRoutes.put("/:id",  updateGiftCtrl);

module.exports = giftsRoutes;