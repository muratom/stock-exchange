import React, { Component } from "react";
import { PortfolioItem } from "./PortfolioItem";

class Portfolio extends Component {
  constructor(props) {
    super(props);
  }

  // TODO: add TOTAL COST field
  render() {
    return (
      <table>
        <thead>
        <tr>
          <th>SYMBOL</th>
          <th>AMOUNT</th>
          {/*<th>TOTAL COST</th>*/}
        </tr>
        </thead>
        <tbody>
        {
          this.props.purchasedStocks.map((stocks, i) => {
            return <PortfolioItem key={i}
                                  symbol={stocks.symbol}
                                  amount={stocks.amount}/>
          })
        }
        </tbody>
      </table>

    )
  }
}

export { Portfolio };