import React, { Component } from "react";

class PortfolioItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.symbol}</td>
        <td>{this.props.amount}</td>
        <td>{this.props.amount * this.props.price}</td>
        {
          this.props.handleSellDialogOpen &&
          <td>
            <button onClick={() => { this.props.handleSellDialogOpen(this.props.symbol) }}>SELL</button>
          </td>
        }
      </tr>
    )
  }
}

export { PortfolioItem };