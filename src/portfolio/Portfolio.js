import React, { Component } from "react";
import { PortfolioItem } from "./PortfolioItem";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

class Portfolio extends Component {
  render() {
    return (
      <div>
        {
          this.props.purchasedStocks.length !== 0 &&
          <Table>
            <TableHead style={{ backgroundColor: "#1e88e5" }}>
              <TableRow>
                <TableCell align="center" style={{ color: "white" }}>SYMBOL</TableCell>
                <TableCell align="center" style={{ color: "white" }}>AMOUNT</TableCell>
                <TableCell align="center" style={ { color: "white" }}>TOTAL COST</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.props.purchasedStocks.map((stocks, i) => {
                  let curStocks = this.props.stocks.find(obj => stocks.symbol === obj.symbol);
                  if (curStocks) {
                    return <PortfolioItem key={i}
                                          symbol={stocks.symbol}
                                          amount={stocks.amount}
                                          price={curStocks.price}
                                          handleSellDialogOpen={this.props.handleSellDialogOpen ? this.props.handleSellDialogOpen : null}/>
                  } else {
                    return null;
                  }
                })
              }
            </TableBody>
          </Table>
        }
        {
          this.props.purchasedStocks.length === 0 && <p>User has no purchased stocks</p>
        }
      </div>
    )
  }
}

export { Portfolio };