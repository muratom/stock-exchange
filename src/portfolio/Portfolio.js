import React, { Component } from "react";
import { PortfolioItem } from "./PortfolioItem";

class Portfolio extends Component {
  render() {
    return (
      <table>
        <thead>
        <tr>
          <th>SYMBOL</th>
          <th>AMOUNT</th>
          <th>TOTAL COST</th>
        </tr>
        </thead>
        <tbody>
        {
          this.props.purchasedStocks.map((stocks, i) => {
            let curStocks = this.props.stocks.find(obj => stocks.symbol === obj.symbol);
            if (curStocks) {
              return <PortfolioItem key={i}
                                    symbol={stocks.symbol}
                                    amount={stocks.amount}
                                    price={curStocks.price}
                                    handleSellDialogOpen={this.props.handleSellDialogOpen}/>
            } else {
              return null;
            }
          })
        }
        </tbody>
      </table>

    )
  }
}

export { Portfolio };