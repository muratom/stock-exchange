import React, { Component } from "react";

class PortfolioItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: this.props.amount,
    }

    this.setupSocket = this.setupSocket.bind(this);
  }

  componentDidMount() {
    this.setupSocket();
  }

  setupSocket() {
    // this.props.socket.on("buy-stocks-accepted", (user, stocks) => {
    //   if (stocks.symbol === this.props.stock.symbol) {
    //     this.setState((state, props) => {
    //       return {
    //         amount: stocks.amount,
    //         pricePerOne: stocks.price
    //       };
    //     });
    //   }
    // });
  }

  render() {
    return (
      <tr>
        <td>{this.props.symbol}</td>
        <td>{this.state.amount}</td>
        <td>{this.state.amount * this.props.price}</td>
      </tr>
    )
  }
}

export { PortfolioItem };