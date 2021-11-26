import React, { Component } from "react";

class PortfolioItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.symbol}</td>
        <td>{this.props.amount}</td>
        <td>{this.props.amount * this.props.price}</td>
        <td>
          <button onClick={() => { this.props.handleSellDialogOpen(this.props.symbol) }}>SELL</button>
        </td>
      </tr>
    )
  }
}

export { PortfolioItem };