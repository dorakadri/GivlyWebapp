require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./routes/users/usersRoute");
const deliveryMensRoutes = require("./routes/deliveryMens/deliveryMensRoute");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const giftsRoutes = require("./routes/gifts/giftsRoute");
const postForumRoute = require("./routes/postsForum/postForumRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const cors = require("cors");

const app = express();
//DB
dbConnect();
app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);


app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);


app.use("/auth", authRoute);
//Middleware
app.use(express.json());

//Users route
app.use("/api/users", userRoutes);
//PostForum route
app.use("/api/posts", postForumRoute);
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
