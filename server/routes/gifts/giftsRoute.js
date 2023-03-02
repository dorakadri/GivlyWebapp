const express = require("express");
const {
    createGiftCtrl,
    fetchAllGiftCtrl,
    deleteGiftCtrl,
    updateGiftCtrl,
} = require("../../controllers/gift/giftCtrl");


const giftsRoutes = express.Router();

giftsRoutes.post("/", createGiftCtrl);

giftsRoutes.get("/", fetchAllGiftCtrl);

giftsRoutes.delete("/:id",  deleteGiftCtrl);

giftsRoutes.put("/:id",  updateGiftCtrl);

module.exports = giftsRoutes;