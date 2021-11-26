import React, { Component } from "react";
// import {io} from "socket.io-client";
//
// const SOCKET_URL = "http://localhost:8000";

class StocksItem extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   amount: this.props.stock.amount,
    //   pricePerOne: this.props.stock.price,
    // }
    //
    // this.setupSocket = this.setupSocket.bind(this);
  }

  // componentDidMount() {
  //   this.setupSocket();
  // }
  //
  // setupSocket() {
  //   this.props.socket.on("buy-stocks-accepted", (user, stocks) => {
  //     if (stocks.symbol === this.props.stock.symbol) {
  //       this.setState((state, props) => {
  //         return {
  //           amount: stocks.amount,
  //           pricePerOne: stocks.price
  //         };
  //       });
  //     }
  //   });
  // }

  render() {
    return (
      <tr>
        <td>{this.props.stock.symbol}</td>
        <td>{ this.props.stock.name }</td>
        <td>{ this.props.stock.amount }</td>
        <td>${ this.props.stock.price }</td>
        <td>${ this.props.stock.maxStep }</td>
        <td>{ this.props.stock.distributionLaw }</td>
        <td>
          <button onClick={() => { this.props.handleBuyDialogOpen(this.props.stock.symbol) }}>BUY</button>
        </td>
      </tr>
    )
  }
}

export { StocksItem };