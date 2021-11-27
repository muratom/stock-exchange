import React, { Component } from "react";
import {useParams } from "react-router";

import { io } from "socket.io-client";
import {Stocks} from "../stock/Stocks";
import BuyDialog from "./BuyDialog";
import {Portfolio} from "../portfolio/Portfolio";
import SellDialog from "./SellDialog";
import {Card, CardContent, CardHeader} from "@mui/material";

const withRouter = WrappedComponent => props => {
  const params = useParams();

  return (
    <WrappedComponent
      {...props}
      params={params}
    />
  );
};

const SOCKET_URL = "http://localhost:8000";

class User extends Component {
  constructor(props) {
    super(props);

    this.urlUsername = "";
    this.socket = io(SOCKET_URL)

    this.state = {
      user: {},
      stocks: [],
      isBuyDialogOpen: false,
      isSellDialogOpen: false,
      currentStockSymbol: "",
    };

    this.getUser = this.getUser.bind(this);
    this.setupSocket = this.setupSocket.bind(this);
    this.handleBuyDialogOpen = this.handleBuyDialogOpen.bind(this);
    this.handleSellDialogOpen = this.handleSellDialogOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.handleSell = this.handleSell.bind(this);
  }

  componentDidMount() {
    this.setupSocket();
    this.urlUsername = this.props.params.username;
    this.getUser(this.urlUsername);
    this.getStocks();
  }

  getUser(username) {
    console.log("Fetching the user data from the server");
    this.socket.emit("get-user", username);
  }

  getStocks() {
    console.log("Fetching the stocks data from the server");
    this.socket.emit("get-stocks");
  }

  setupSocket() {
    this.socket.on("connect", () => {
      console.log("Client: connection is established");
    });

    this.socket.on("send-user", (res) => {
      switch (res.status) {
        case "OK":
          this.setState(() => {
            return { user: res.user }
          });
          this.socket.emit("greet-user", this.state.user);
          break;
        case "Error":
          alert(res.msg)
          break;
        default:
          break;
      }
    });

    this.socket.on("send-stocks", (res) => {
      this.setState(() => {
        return { stocks: res }
      });
    });

    this.socket.on("buy-stocks-rejected", (msg) => {
      alert(msg);
    });

    this.socket.on("buy-stocks-accepted", (user, exchangeStocks) => {
      this.handleClose();

      let stockInd = this.state.stocks.findIndex(obj => obj.symbol === exchangeStocks.symbol);
      let stocks = [...this.state.stocks];
      stocks[stockInd] = exchangeStocks;
      this.setState(() => {
        return { stocks: stocks }
      });

      if (user.username === this.state.user.username) {
        this.setState(() => {
          return { user: user };
        });
      }
    });

    this.socket.on("sell-stocks-rejected", (msg) => {
      alert(msg);
    });

    this.socket.on("sell-stocks-accepted", (user, exchangeStocks) => {
      this.handleClose();

      let stockInd = this.state.stocks.findIndex(obj => obj.symbol === exchangeStocks.symbol);
      let stocks = [...this.state.stocks];
      stocks[stockInd] = exchangeStocks;
      this.setState(() => {
        return { stocks: stocks }
      });

      if (user.username === this.state.user.username) {
        this.setState(() => {
          return { user: user };
        });
      }
    });

    this.socket.on("update-prices", (stocks) => {
      this.setState(() => {
        return { stocks: stocks };
      });
    });
  }

  handleBuyDialogOpen(symbol) {
    this.setState({
      currentStockSymbol: symbol,
      isBuyDialogOpen: true
    });
  }

  handleSellDialogOpen(symbol) {
    this.setState({
      currentStockSymbol: symbol,
      isSellDialogOpen: true
    })
  }

  handleClose() {
    this.setState({
      isSellDialogOpen: false,
      isBuyDialogOpen: false,
    });
  }

  handleBuy(symbol, amount) {
    this.socket.emit("buy-stocks-request", symbol, amount);
  }

  handleSell(symbol, amount) {
    this.socket.emit("sell-stocks-request", symbol, amount);
  }

  render() {
    let profitPercentage = Math.round((this.state.user.curBudget - this.state.user.startBudget) / this.state.user.startBudget * 10000) / 100;
    let profitColor = "blue";
    if (profitPercentage > 0) {
      profitPercentage = `+${profitPercentage}`;
      profitColor = "green";
    } else if (profitPercentage < 0) {
      profitPercentage = `${profitPercentage}`;
      profitColor = "red";
    }

    let totalStocksProfit = 0;
    if (this.state.user.purchasedStocks) {
      for (let portfolioStock of this.state.user.purchasedStocks) {
        let correspondingExchangeStock = this.state.stocks.find(obj => obj.symbol === portfolioStock.symbol);
        if (correspondingExchangeStock) {
          totalStocksProfit += correspondingExchangeStock.price * portfolioStock.amount;
        }
      }
    }

    return (
      <div>
        <Card variant="outlined" style={{ width: "80%", margin: "10px auto" }}>
          <CardHeader title={<strong>{this.state.user.firstName} {this.state.user.lastName}</strong>}
                      subheader={this.state.user.username}
                      action={
                        <table>
                          <tr><td style={{fontWeight: "bold"}}>START BUDGET:</td><td style={{ color: "blue" }}>${ this.state.user.startBudget }</td></tr>
                          <tr><td style={{fontWeight: "bold"}}>CURRENT BUDGET:</td><td style={{ color: profitColor }}>${ this.state.user.curBudget } ({profitPercentage}%)</td></tr>
                          <tr><td style={{fontWeight: "bold"}}>TOTAL PROFIT:</td><td style={{ color: "blue" }}>${ totalStocksProfit }</td></tr>
                        </table>
                      }
          />

          <CardContent>

            <Stocks socket={this.socket}
                    stocks={this.state.stocks}
                    handleBuyDialogOpen={this.handleBuyDialogOpen}/>
          </CardContent>
        </Card>
        <Card variant="outlined" style={{ width: "80%", margin: "10px auto" }}>
          <CardContent>
            <Portfolio purchasedStocks={this.state.user.purchasedStocks ? this.state.user.purchasedStocks : []}
                       stocks={this.state.stocks}
                       handleSellDialogOpen={this.handleSellDialogOpen}
                       sellAll={this.handleSell}
            />
          </CardContent>
        </Card>

        <BuyDialog symbol={this.state.currentStockSymbol}
                   open={this.state.isBuyDialogOpen}
                   handleClose={this.handleClose}
                   handleBuy={this.handleBuy}/>

        <SellDialog symbol={this.state.currentStockSymbol}
                    open={this.state.isSellDialogOpen}
                    handleClose={this.handleClose}
                    handleSell={this.handleSell}/>
      </div>

    )
  }
}

export default withRouter(User);