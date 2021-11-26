import React, { Component } from "react";
import {io} from "socket.io-client";
import {Stocks} from "../stock/Stocks";
import {Portfolio} from "../portfolio/Portfolio";

const SOCKET_URL = "http://localhost:8000";

class Admin extends Component {
  constructor(props) {
    super(props);

    this.socket = io(SOCKET_URL)

    this.state = {
      stocks: [],
      users: []
    }

    this.setupSocket = this.setupSocket.bind(this);
    this.startBidding = this.startBidding.bind(this);
    this.changeDistributionLaw = this.changeDistributionLaw.bind(this);
  }

  componentDidMount() {
    this.setupSocket();
    this.socket.emit("greet-admin");
    console.log("Admin: fetching the stocks data from the server");
    this.socket.emit("get-stocks");
  }

  setupSocket() {
    this.socket.on("connect", () => {
      console.log("Admin: connection is established");
    });

    this.socket.on("send-stocks", (res) => {
      this.setState((state, props) => {
        return { stocks: res }
      });
    });

    this.socket.on("send-active-users", (users) => {
      this.setState((state, props) => {
        return { users: users }
      });
    });

    this.socket.on("sell-stocks-accepted", (user, exchangeStocks) => {
      let stockInd = this.state.stocks.findIndex(obj => obj.symbol === exchangeStocks.symbol);
      let stocks = [...this.state.stocks];
      stocks[stockInd] = exchangeStocks;
      this.setState((state, props) => {
        return { stocks: stocks }
      });

      let userInd = this.state.users.findIndex(obj => obj.username === user.username);
      let users = [...this.state.users];
      users[userInd] = user;
      this.setState((state, props) => {
        return { users: users }
      });
    });

    this.socket.on("buy-stocks-accepted", (user, exchangeStocks) => {
      let stockInd = this.state.stocks.findIndex(obj => obj.symbol === exchangeStocks.symbol);
      let stocks = [...this.state.stocks];
      stocks[stockInd] = exchangeStocks;
      this.setState((state, props) => {
        return { stocks: stocks }
      });

      let userInd = this.state.users.findIndex(obj => obj.username === user.username);
      let users = [...this.state.users];
      users[userInd] = user;
      this.setState((state, props) => {
        return { users: users }
      });
    });

    this.socket.on("update-prices", (stocks) => {
      this.setState((state, props) => {
        return { stocks: stocks };
      });
    });

    this.socket.on("distribution-law-updated", (symbol, law) => {
      let stockInd = this.state.stocks.findIndex(obj => obj.symbol === symbol);
      let stocks = [...this.state.stocks];
      stocks[stockInd] = {
        ...stocks[stockInd],
        distributionLaw: law,
      };
      this.setState((state, props) => {
        return { stocks: stocks }
      });
    })
  }

  startBidding() {
    this.socket.emit("start-bidding");
  }

  changeDistributionLaw(symbol, law) {
    this.socket.emit("change-distribution-law", symbol, law);
  }

  render() {
    return (
      <div>
        <h3>Admin's page</h3>
        <button onClick={this.startBidding}>Start bidding</button>
        <Stocks socket={this.socket}
                stocks={this.state.stocks}
                changeDistributionLaw={this.changeDistributionLaw}/>
        {
          this.state.users.map((obj, i) => {
            return (
              <div key={i}>
                <p>{obj.username}: ${obj.curBudget}</p>
                <Portfolio purchasedStocks={obj.purchasedStocks ? obj.purchasedStocks : []}
                           stocks={this.state.stocks}/>
              </div>
            )
        })}
      </div>
    )
  }
}

export { Admin }