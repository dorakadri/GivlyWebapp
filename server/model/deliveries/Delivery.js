const mongoose = require("mongoose");

//create schema
const DeliverySchema = new mongoose.Schema(
  {
    name: {
      required: [true, " name is required"],
      type: String,
    },
    adress: {
        required: [true, " adress is required"],
        type: String,
      },   
    state: {
        type: String,
        enum: ["New", "Transit", "Delivered"],
        required: true,
      },

    phone: {
      required: [true, "phone is required"],
      type: Number,
    },
  

  })



const Delivery = mongoose.model("Delivery", DeliverySchema);

module.exports = Delivery;
