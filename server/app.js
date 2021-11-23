const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 8000;

const cors = require("cors");
const corsOption = {
  credentials: true,
  origin: "http://localhost:3000",
  methods: ["GET", "PUT", "POST", "DELETE"],
  allowedHeaders: ["Authorization", "X-Requested-With",
    "X-HTTP-Method-Override", "Content-Type", "Cache-Control", "Accept"],
};

app.use(cors(corsOption));

const bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Place for routes
const loginRouter = require("./routes/login");
app.use("/", loginRouter);

// Socket
let activeUsers = [];

let users = require("./data/users.json").users;
let stocks = require("./data/stocks.json").stocks;
let settings = require("./data/settings.json").settings;

io.on("connection", (socket) => {
  socket.on("greet-user", (user) => {
    activeUsers.push(user);
  });
});

app.listen(port, () => {
  console.log(`HTTP server is starting listening on port ${port}`);
});
