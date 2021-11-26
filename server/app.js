const express = require("express");
const { Server } = require("socket.io")

const port = 8000;

const app = express();
const httpServer = app.listen(port, () => {
  console.log(`HTTP server is starting listening on port ${port}`);
});
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000"
  }
});

const cors = require("cors");
const corsOption = {
  credentials: true,
  origin: "http://localhost:3000",
  methods: ["GET", "PUT", "POST", "DELETE"],
  // allowedHeaders: ["Authorization", "X-Requested-With",
  //   "X-HTTP-Method-Override", "Content-Type", "Cache-Control", "Accept"],
};

app.use(cors(corsOption));

const bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const loginRouter = require("./routes/login");
app.use("/", loginRouter);
// const usersRouter = require("./routes/users");
// app.use("/user", usersRouter);
const stocksRouter = require("./routes/stocks");
app.use("/stocks", stocksRouter);

// Socket
let activeUsers = [];

let users = require("./data/users.json").users;
let stocks = require("./data/stocks.json").stocks;
let settings = require("./data/settings.json").settings;

users.forEach(user => {
  user.curBudget = user.startBudget;
  user.purchasedStocks = [];
});

io.on("connection", (socket) => {
  socket.on("greet-user", user => {
    activeUsers.push(user);
    socket["username"] = user.username;
    console.log("Add user", user.username);
  });

  socket.on("disconnect", () => {
    activeUsers.filter(obj => {
      return obj.username !== socket["username"];
    });
  });

  socket.on("get-user", (username) => {
    let user = users.find(obj => obj.username === username);
    if (!user) {
      socket.emit("send-user", {
        status: "Error",
        msg: "User isn't found"
      });
      return;
    }
    socket.emit("send-user", {
      status: "OK",
      user: user
    });
  });

  socket.on("get-stocks", () => {
    socket.emit("send-stocks", stocks);
  });

  socket.on("buy-stocks-request", (symbol, requestedAmount) => {
    let user = users.find(obj => obj.username === socket["username"]);
    let curStocks = stocks.find(obj => {
      return obj.symbol === symbol;
    });

    if (requestedAmount > curStocks.amount) {
      socket.emit("buy-stocks-rejected", "Exceeding the available amount of stocks");
      return;
    }
    if (user.curBudget < curStocks.price * requestedAmount) {
      socket.emit("buy-stocks-rejected", "Not enough funds");
      return;
    }

    // Update list of the purchased stocks
    let userStock = user.purchasedStocks.find(stock => {
      return stock.symbol === symbol;
    });
    if (!userStock) {
      user.purchasedStocks.push({
        symbol: symbol,
        amount: requestedAmount
      });
    } else {
      userStock.amount += requestedAmount;
    }

    // Update the current user's budget
    user.curBudget -= curStocks.price * requestedAmount;

    // Update the amount of stocks
    curStocks.amount -= requestedAmount;

    socket.emit("buy-stocks-accepted", user, curStocks);
  });
});





