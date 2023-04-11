require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./routes/users/usersRoute");
//chat 
const User = require("./model/user/User");
const Message = require("./model/Message/Message");
const rooms = ["general", "Call for Help", "Assistance", "Questions"];
//chat

const deliveryMensRoutes = require("./routes/deliveryMens/deliveryMensRoute");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const giftsRoutes = require("./routes/gifts/giftsRoute");
const postRoutes=require("./routes/posts/postsRoute")
const diyRoutes=require("./routes/Objects/objectRoute")
const postForumRoute = require("./routes/postsForum/postForumRoute");
const commentRoutes = require("./routes/comments/commentRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const cors = require("cors");

const app = express();
//DB


const axios = require('axios')
const cheerio = require('cheerio')
app.use(cors())
const url = 'https://jamaity.org/associations'




app.use(express.urlencoded({ extended: true }));
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
//comment routes
app.use("/api/comments", commentRoutes);
//DeliveryMen route
app.use("/api/DeliveryMen", deliveryMensRoutes);

//gift route
app.use("/api/gift", giftsRoutes);
app.use("/api/mainposts", postRoutes);
app.use("/api/diy", diyRoutes);//chat
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

async function getLastMessagesFromRoom(room) {
  let roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
  ]);
  return roomMessages;
}

function sortRoomMessagesByDate(messages) {
  return messages.sort(function (a, b) {
    let date1 = a._id.split("/");
    let date2 = b._id.split("/");

    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];

    return date1 < date2 ? -1 : 1;
  });
}

// socket connection

io.on("connection", (socket) => {
  socket.on("new-user", async (userid) => {
    const user = await User.findById(userid)
    if (!user) {
      socket.emit("error", { message: `User with id ${userid} not found` });
      return;
    }
    const userIds = user.matches.userId;
    const userIdsAsOwner = user.matchesAsOwner.userId;
    const allUserIds = [...userIds, ...userIdsAsOwner,userid];
    const uniqueUserIds = [...new Set(allUserIds)];
    const members = await User.find({ _id: { $in: uniqueUserIds } });
    console.log(userid);
    //const members = await User.find();
    socket.emit("new-user", members);
  });

  socket.on("join-room", async (newRoom, previousRoom) => {
    socket.join(newRoom);
    socket.leave(previousRoom);
    let roomMessages = await getLastMessagesFromRoom(newRoom);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit("room-messages", roomMessages);
  });

  socket.on("message-room", async (room, content, sender, time, date) => {
    const newMessage = await Message.create({
      content,
      from: sender,
      time,
      date,
      to: room,
    });
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    // sending message to room
    io.to(room).emit("room-messages", roomMessages);
    socket.broadcast.emit("notifications", room);
  });
});

app.get("/rooms", (req, res) => {
  res.json(rooms);
});
//chat
//err handler
app.use(notFound);
app.use(errorHandler);


app.get('/', function (req, res) {
  res.json('This is my webscraper')
})
const articles = []

app.get('/results', (req, res) => {
  const filteredData = articles.filter(obj => obj.title.trim() !== '' &&  obj.imgSrc.trim() !== '');
  res.json(filteredData)

})
axios(url)
.then(response => {
  const html = response.data
  const $ = cheerio.load(html)



  // $('.h4', html).each(function () { //<-- cannot be a function expression
  //     const title = $(this).text()
  //     const url = $(this).find('a').attr('href')
  //     articles.push({
  //         title,
  //         url,
  //     })
  // })
  $('div.panel').each(function () {
      const href = $(this).find('a.text-left').attr('href');
      const title = $(this).find('a.text-left').text();
      const imgSrc = $(this).find('img').attr('src');
      articles.push({
          href, title, imgSrc
      })
  });

}).catch(err => console.log(err))
const secondUrl = 'https://jamaity.org/associations/page/2';
axios(secondUrl).then(result => {
      const html = result.data;
      const $ = cheerio.load(html);

      // Scrape the information from the second page using Cheerio
      $('div.panel').each(function () {
          const href = $(this).find('a.text-left').attr('href');
          const title = $(this).find('a.text-left').text();
          const imgSrc = $(this).find('img').attr('src');
          articles.push({
              title,
              href, 
              imgSrc
          });
      });
  })

const ThirdUrl = 'https://jamaity.org/associations/page/3';
axios(ThirdUrl).then(result => {
      const html = result.data;
      const $ = cheerio.load(html);

      // Scrape the information from the second page using Cheerio
      $('div.panel').each(function () {
          const href = $(this).find('a.text-left').attr('href');
          const title = $(this).find('a.text-left').text();
          const imgSrc = $(this).find('img').attr('src');
          articles.push({
              title,
              href, 
              imgSrc
          });
      });
  })


  const FourthUrl = 'https://jamaity.org/associations/page/4';
axios(FourthUrl).then(result => {
      const html = result.data;
      const $ = cheerio.load(html);

      // Scrape the information from the second page using Cheerio
      $('div.panel').each(function () {
          const href = $(this).find('a.text-left').attr('href');
          const title = $(this).find('a.text-left').text();
          const imgSrc = $(this).find('img').attr('src');
          articles.push({
              title,
              href, 
              imgSrc
          });
      });
  })


const FifthUrl = 'https://jamaity.org/associations/page/5';
axios(FifthUrl).then(result => {
      const html = result.data;
      const $ = cheerio.load(html);

      // Scrape the information from the second page using Cheerio
      $('div.panel').each(function () {
          const href = $(this).find('a.text-left').attr('href');
          const title = $(this).find('a.text-left').text();
          const imgSrc = $(this).find('img').attr('src');
          articles.push({
              title,
              href, 
              imgSrc
          });
      });
  })
  const SixthUrl = 'https://jamaity.org/associations/page/6';
  axios(SixthUrl).then(result => {
          const html = result.data;
          const $ = cheerio.load(html);
  
          // Scrape the information from the second page using Cheerio
          $('div.panel').each(function () {
              const href = $(this).find('a.text-left').attr('href');
              const title = $(this).find('a.text-left').text();
              const imgSrc = $(this).find('img').attr('src');
              articles.push({
                  title,
                  href, 
                  imgSrc
              });
          });
      })

      const Sevenurl = 'https://jamaity.org/associations/page/7';
      axios(Sevenurl).then(result => {
              const html = result.data;
              const $ = cheerio.load(html);
      
              // Scrape the information from the second page using Cheerio
              $('div.panel').each(function () {
                  const href = $(this).find('a.text-left').attr('href');
                  const title = $(this).find('a.text-left').text();
                  const imgSrc = $(this).find('img').attr('src');
                  articles.push({
                      title,
                      href, 
                      imgSrc
                  });
              });
          })
  
          const Eighturl = 'https://jamaity.org/associations/page/8';
      axios(Eighturl).then(result => {
              const html = result.data;
              const $ = cheerio.load(html);
      
              // Scrape the information from the second page using Cheerio
              $('div.panel').each(function () {
                  const href = $(this).find('a.text-left').attr('href');
                  const title = $(this).find('a.text-left').text();
                  const imgSrc = $(this).find('img').attr('src');
                  articles.push({
                      title,
                      href, 
                      imgSrc
                  });
              });
          })
          const Nineurl = 'https://jamaity.org/associations/page/9';
          axios(Nineurl).then(result => {
                  const html = result.data;
                  const $ = cheerio.load(html);
          
                  // Scrape the information from the second page using Cheerio
                  $('div.panel').each(function () {
                      const href = $(this).find('a.text-left').attr('href');
                      const title = $(this).find('a.text-left').text();
                      const imgSrc = $(this).find('img').attr('src');
                      articles.push({
                          title,
                          href, 
                          imgSrc
                      });
                  });
              })

              const Tenurl = 'https://jamaity.org/associations/page/10';
              axios(Tenurl).then(result => {
                      const html = result.data;
                      const $ = cheerio.load(html);
              
                      // Scrape the information from the second page using Cheerio
                      $('div.panel').each(function () {
                          const href = $(this).find('a.text-left').attr('href');
                          const title = $(this).find('a.text-left').text();
                          const imgSrc = $(this).find('img').attr('src');
                          articles.push({
                              title,
                              href, 
                              imgSrc
                          });
                      });
                  })

//server
const PORT = process.env.PORT || 8000;
server.listen(PORT, console.log(`Server is running ${PORT}`));
