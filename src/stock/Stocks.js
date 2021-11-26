import React, { Component } from "react";

import { StocksItem } from "./StocksItem";

class Stocks extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>SYMBOL</th>
              <th>COMPANY</th>
              <th>AMOUNT</th>
              <th>PRICE</th>
              <th>MAX PRICE STEP</th>
              <th>DISTRIBUTION LAW</th>
            </tr>
          </thead>
          <tbody>
            { this.props.stocks.map((obj, i) =>
              <StocksItem key={i}
                          stock={obj}
                          socket={this.props.socket}
                          handleBuyDialogOpen={this.props.handleBuyDialogOpen}/>) }
          </tbody>

        </table>
      </div>
    )
  }
}

export { Stocks };