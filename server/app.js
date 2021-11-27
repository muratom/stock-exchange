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
// const stocksRouter = require("./routes/stocks");
// app.use("/stocks", stocksRouter);

// Socket
let activeUsers = [];

let users = require("./data/users.json").users;
let stocks = require("./data/stocks.json").stocks;
let settings = require("./data/settings.json").settings;

users.forEach(user => {
  user.curBudget = user.startBudget;
  user.purchasedStocks = [];
});

let timer = null;

io.on("connection", (socket) => {
  socket.on("greet-user", user => {
    activeUsers.push(user);
    socket["username"] = user.username;
    console.log("Add user", user.username);
  });

  socket.on("greet-admin", () => {
    socket.emit("send-active-users", users);
    console.log("Add admin");
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
    let exchangeStocksToBuy = stocks.find(obj => {
      return obj.symbol === symbol;
    });
    if (requestedAmount > exchangeStocksToBuy.amount) {
      socket.emit("buy-stocks-rejected", "Exceeding the available amount of stocks");
      return;
    }
    if (user.curBudget < exchangeStocksToBuy.price * requestedAmount) {
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
    user.curBudget -= exchangeStocksToBuy.price * requestedAmount;

    // Update the amount of stocks
    exchangeStocksToBuy.amount -= requestedAmount;

    io.emit("buy-stocks-accepted", user, exchangeStocksToBuy);
  });

  socket.on("sell-stocks-request", (symbol, amount) => {
    let user = users.find(obj => obj.username === socket["username"]);
    // Invariant: stockForSale isn't undefined
    let portfolioStocksForSale = user.purchasedStocks.find(obj => {
      return obj.symbol === symbol;
    });

    if (portfolioStocksForSale.amount < amount) {
      socket.emit("sell-stocks-rejected", "Exceeding the available amount of stocks");
      return;
    }

    let exchangeStocks = stocks.find(obj => obj.symbol === symbol);

    // Update the current user's budget
    user.curBudget += amount * exchangeStocks.price;

    // Update amount of purchased stocks
    portfolioStocksForSale.amount -= amount;

    // Update amount of stocks in the list
    exchangeStocks.amount += amount;

    // Delete unnecessary data
    user.purchasedStocks = user.purchasedStocks.filter(obj => obj.amount !== 0);

    io.emit("sell-stocks-accepted", user, exchangeStocks)
  });

  socket.on("start-bidding", () => {
    if (timer) {
      return;
    }
    let delta;
    timer = setInterval(() => {
      for (let stock of stocks) {
        switch(stock.distributionLaw) {
          case "Normal":
            delta = getNormalRandom(stock.maxStep);
            if (stock.price + delta > 0) {
              stock.price += delta
            } else {
              stock.price += stock.maxStep
            }
            break;
          case "Uniform":
            delta = getUniformRandom(stock.maxStep);
            if (stock.price + delta > 0) {
              stock.price += delta
            } else {
              stock.price += stock.maxStep
            }
            break;
          default:
            break;
        }
      }
      io.emit("update-prices", stocks);
    }, settings.recalcCostDelaySec * 1000)
  });

  socket.on("change-distribution-law", (symbol, law) => {
    let stocksToUpdate = stocks.find(obj => {
      return obj.symbol === symbol;
    });

    stocksToUpdate.distributionLaw = law;
    io.emit("distribution-law-updated", symbol, law);
  });

});

function getUniformRandom(maxStep) {
  let num = Math.random();
  // Scale
  num *= 2 * maxStep;
  // Shift
  num -= maxStep;
  return Math.round(num);
}

function getNormalRandom(maxStep) {
  // Box-Muller transformation (uniform -> normal)
  let num = Math.sqrt( -2.0 * Math.log(1 - Math.random()) ) * Math.cos( 2.0 * Math.PI * Math.random())

  num = num / 10.0 + 0.5 // Translate to 0 -> 1
  if (num > 1 || num < 0) {
    num = getNormalRandom(maxStep) // resample between 0 and 1 if out of range
  } else {
    num *= 2 * maxStep;
    num -= maxStep;
  }

  return Math.round(num);
}





