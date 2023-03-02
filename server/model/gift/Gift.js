const mongoose = require("mongoose");

//create schema
const GiftSchema = new mongoose.Schema(
    {
        firstName: {
            required: [true, "First name is required"],
            type: String,
          },
          type: {
            required: [true, "type is required"],
            type: String,
          },
          giftPhoto: {
            type: String,
            default:
                
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          },
          company: {
            required: [true, "company is required"],
            type: String,
          },
          giftType: {
            type: String,
            enum: ["medium", "high", "low"],
            required: true
          },
         


    
    })










const Gift = mongoose.model("Gift", GiftSchema);

module.exports = Gift;