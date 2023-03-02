const expressAsyncHandler = require("express-async-handler");
const Gift= require("../../model/gift/Gift");
const validateMongodbId = require("../../utils/validateMongodbID");
const express = require('express');
const router = express.Router();
//---Create--

const createGiftCtrl = expressAsyncHandler(async (req, res) => {


    const { name,type,giftPhoto,company,giftType} = req.body;
    console.log(req.body);
  
    try {
      const gift = await Gift.create({
        name,type,giftPhoto,company,giftType
      });
      res.json(gift);
      
    } catch (error) {
      res.json(error);
    }
  });

 

  //--getall -------

const  fetchAllGiftCtrl = expressAsyncHandler(async (req, res) => {
    try {
      const gift = await Gift.find({});
  
      res.json(gift);
    } catch (error) {
      res.json(error);
    }
  });

    //--delete---

const deleteGiftCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      const gift = await Gift.findOneAndDelete(id);
      res.json(gift);
      
    } catch (error) {
      res.json(error);
    }
  });

  
//---- Update gift--

const updateGiftCtrl = expressAsyncHandler(async (req, res) => {
    console.log(req.user);
    const { id } = req.params;
    validateMongodbId(id);
  
    try {
      const gift = await Gift.findByIdAndUpdate(
        id,
        {
          ...req.body,
         
        },
        {
          new: true,
        }
      );
      res.json(gift);
    } catch (error) {
      res.json(error);
    }
  });



  module.exports = {createGiftCtrl, fetchAllGiftCtrl, deleteGiftCtrl, updateGiftCtrl};
  
  