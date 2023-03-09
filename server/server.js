const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./routes/users/usersRoute");
const deliveryMensRoutes = require("./routes/deliveryMens/deliveryMensRoute");
const giftsRoutes = require("./routes/gifts/giftsRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const cors = require("cors");

const app = express();
//DB
dbConnect();

app.use(cors());

//Middleware
app.use(express.json());

//Users route
app.use("/api/users", userRoutes);

//DeliveryMen route
app.use("/api/DeliveryMen", deliveryMensRoutes);

//gift route
app.use("/api/gift", giftsRoutes);

//err handler
app.use(notFound);
app.use(errorHandler);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running ${PORT}`));