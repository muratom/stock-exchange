import React, { Component } from "react";
import {io} from "socket.io-client";
import {Stocks} from "../stock/Stocks";
import {Portfolio} from "../portfolio/Portfolio";
import {Button, Card, CardContent, CardHeader, MenuItem, Select} from "@mui/material";

const SOCKET_URL = "http://localhost:8000";

class Admin extends Component {
  constructor(props) {
    super(props);

    this.socket = io(SOCKET_URL)

    this.state = {
      stocks: [],
      users: [],
      selectedUser: "None",
    }

    this.setupSocket = this.setupSocket.bind(this);
    this.startBidding = this.startBidding.bind(this);
    this.changeDistributionLaw = this.changeDistributionLaw.bind(this);
    this.onChangeSelectedUser = this.onChangeSelectedUser.bind(this);
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
      this.setState(() => {
        return { stocks: res }
      });
    });

    this.socket.on("send-active-users", (users) => {
      this.setState(() => {
        return { users: users }
      });
    });

    this.socket.on("sell-stocks-accepted", (user, exchangeStocks) => {
      let stockInd = this.state.stocks.findIndex(obj => obj.symbol === exchangeStocks.symbol);
      let stocks = [...this.state.stocks];
      stocks[stockInd] = exchangeStocks;
      this.setState(() => {
        return { stocks: stocks }
      });

      let userInd = this.state.users.findIndex(obj => obj.username === user.username);
      let users = [...this.state.users];
      users[userInd] = user;
      this.setState(() => {
        return { users: users }
      });
    });

    this.socket.on("buy-stocks-accepted", (user, exchangeStocks) => {
      let stockInd = this.state.stocks.findIndex(obj => obj.symbol === exchangeStocks.symbol);
      let stocks = [...this.state.stocks];
      stocks[stockInd] = exchangeStocks;
      this.setState(() => {
        return { stocks: stocks }
      });

      let userInd = this.state.users.findIndex(obj => obj.username === user.username);
      let users = [...this.state.users];
      users[userInd] = user;
      this.setState(() => {
        return { users: users }
      });
    });

    this.socket.on("update-prices", (stocks) => {
      this.setState(() => {
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
      this.setState(() => {
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

  onChangeSelectedUser(e) {
    this.setState({ selectedUser: e.target.value});
  }

  render() {
    let selectedUserInfo;
    if (this.state.selectedUser !== "None") {
      selectedUserInfo = (
        <div>
          <p>CURRENT BUDGET: <span style={{color: "green"}}>${this.state.selectedUser.curBudget}</span></p>
          <Portfolio purchasedStocks={this.state.selectedUser.purchasedStocks ? this.state.selectedUser.purchasedStocks : []}
                     stocks={this.state.stocks}/>
        </div>
      );
    } else {
      selectedUserInfo = (
        <div>
          <p>Select the user to see information about him</p>
        </div>
      );
    }

    return (
      <Card variant="outlined" style={{ width: "80%", margin: "10px auto" }}>
        <CardHeader title={<strong>Administrator</strong>}
                    action={
                      <Button variant="outlined" onClick={this.startBidding}>Start bidding</Button>
                    }
        />
        <CardContent>
          <Stocks socket={this.socket}
                  stocks={this.state.stocks}
                  changeDistributionLaw={this.changeDistributionLaw}/>
          <Select
            value={this.state.selectedUser}
            onChange={this.onChangeSelectedUser}
          >
            <MenuItem value="None" key="-1">None</MenuItem>
            {
              this.state.users.map((obj, i) => {
                return (
                  <MenuItem value={obj} key={i}>
                    {obj.username}
                  </MenuItem>
                )
              })}
          </Select>
          { selectedUserInfo }
        </CardContent>
      </Card>
    )
  }
}

export { Admin }