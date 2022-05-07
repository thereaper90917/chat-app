const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const Datastore = require("@seald-io/nedb");

const app = express();
app.use(cors());
const server = createServer(app);

const db = new Datastore();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
  },
});
let id;
// Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/v1/users", async (req, res) => {
  let id = await db.insertAsync({
    name: req.body.user,
    socketId: req.body.socketId,
  });
  // console.log(id);
  res.send("Hello World!");
});

// socket IO
let username = "";
io.on("connection", async (socket) => {
  await db.insertAsync({
    name: username,
    socketId: socket.id,
  });
  socket.on("chat message", async (msg) => {
    // let user = await db.findAsync({ socketId: socket.id });
    console.log(socket.id);

    let user = await db.findAsync({ socketId: socket.id });
    console.log(user);
    io.emit("chat message", user, msg);
  });

  socket.on("socketId", async (user) => {
    username = user;
    // username = await db.findAsync({ name: user });
    // console.log(username);
  });
});

// io.sockets.on("connect", function (socket) {

// });

let PORT = 8001 || process.env.PORT;
server.listen(PORT, () => console.log(`Server Running ${PORT}`));
