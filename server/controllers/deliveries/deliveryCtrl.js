const expressAsyncHandler = require("express-async-handler");
const Delivery = require("../../model/deliveries/Delivery");
const validateMongodbId = require("../../utils/validateMongodbID");
const cron = require('node-cron');

const express = require("express");
const DeliveryMen = require("../../model/deliveryMen/DeliveryMen");
const Post = require("../../model/post/Posts");
const router = express.Router();


function getRandomDate() {
  const start = new Date();
  const end = new Date();
  end.setDate(end.getDate() + 15); 
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate 
}

//---Create--

const createDeliveryCtrl = expressAsyncHandler(async (req, res) => {
  const {locationOwner, locationUser, post, user} = req.body;
  console.log(req.body);

  try {
    const deliveryId = await DeliveryMen.findOne({isAvailable:true},{_id:1})

    console.log(deliveryId);
    if (deliveryId){
      const delivery = await Delivery.create({
        locationOwner,
        locationUser,
        state:"New",
        deliveryMen:deliveryId._id,
        user,
        post,
        dateLivraison:getRandomDate()
      
  
      });
      await DeliveryMen.updateOne({_id:deliveryId},{isAvailable:false})
      await Post.updateOne({_id:post},{isTaken:true})
      res.json(delivery);
    
    }else{
      res.status(404).json({ message: "delevery men not found" });
    }
   
  } catch (error) {
    res.json(error);
  }
});

///cron
async function updateOrderStatus() {
  const today = new Date().toISOString().substring(0, 10); // get the current date in ISO format (yyyy-mm-dd)
  const ordersToUpdate = await Delivery.find({dateLivraison:{ $gte: new Date(today), $lt: new Date(today + 'T23:59:59.999Z') }, state:'New'}); // find orders with the delivery date equal to today and the status not already 'pending'
 console.log(ordersToUpdate)
  ordersToUpdate.forEach(async (order) => {
    order.state = 'Transit'; // update the status to 'pending'
    await order.save(); 
    console.log(`Order ${order._id} status updated to transit`); // log a message to the console
  });
  
}
cron.schedule('0 0 * * *', () => {
  updateOrderStatus();
});
//--getall -------

const fetchAllDeliveryCtrl = expressAsyncHandler(async (req, res) => {
  const userId = req.params.userId;
  try {
    const deliveries = await Delivery.find({"user":userId})
    .populate('post')
    .populate({
      path: 'post',
      populate: {
        path: 'userId',
        select: 'firstName lastName profilePhoto'
      }
    }).populate('user',"firstName lastName profilePhoto")
    .populate("deliveryMen","firstName phone")

    
    ;

  console.log("aaaa");

  res.json(deliveries);
  } catch (error) {
    console.log(error);
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
///get by id 
const getByIdCtrl =expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try { const deliveries = await Delivery.findById(id)
  .populate('post')
  .populate({
    path: 'post',
    populate: {
      path: 'userId',
      select: 'firstName lastName profilePhoto'
    }
  }).populate('user',"firstName lastName profilePhoto")
  .populate("deliveryMen","firstName phone")

  
  ;

console.log("aaaa");

res.json(deliveries);
} catch (error) {
  console.log(error);
  res.json(error);
}
});



module.exports = {
  
  createDeliveryCtrl,
  fetchAllDeliveryCtrl,
  deleteDeliveryCtrl,

  getByIdCtrl,
};
