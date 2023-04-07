const expressAsyncHandler = require("express-async-handler");
const Delivery = require("../../model/deliveries/Delivery");
const validateMongodbId = require("../../utils/validateMongodbID");
const express = require("express");
const router = express.Router();

const fetchById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const delivery= await Delivery.findById(id);
    console.log(delivery);
    if (delivery) {
      res.json(delivery);
    } else {
      res.status(404).json({ message: "Gift not found" });
    }
  } catch (error) {
    res.json(error);
  }
});
//---Create--

const createDeliveryCtrl = expressAsyncHandler(async (req, res) => {
  const {name, adress, state, phone} = req.body;
  console.log(req.body);

  try {
    const delivery = await Delivery.create({
      name,
      adress,
      state,
      phone
    });
    res.json(delivery);
  } catch (error) {
    res.json(error);
  }
});

//--getall -------

const fetchAllDeliveryCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const delivery = await Delivery.find({});

    res.json(delivery);
  } catch (error) {
    res.json(error);
  }
});

//--delete---

const deleteDeliveryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const delivery = await Delivery.findOneAndDelete(id);
    res.json(delivery);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createDeliveryCtrl,
  fetchAllDeliveryCtrl,
  deleteDeliveryCtrl,
 
};
