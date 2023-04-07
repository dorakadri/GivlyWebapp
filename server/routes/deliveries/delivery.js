const express = require("express");
const {
    createDeliveryCtrl,
    fetchAllDeliveryCtrl,
    deleteDeliveryCtrl,
   

} = require("../../controllers/deliveries/deliveryCtrl");


const deliveryRoutes = express.Router();

deliveryRoutes.post("/", createDeliveryCtrl);

deliveryRoutes.get("/", fetchAllDeliveryCtrl);


deliveryRoutes.delete("/:id",  deleteDeliveryCtrl);


module.exports = deliveryRoutes;