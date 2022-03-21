import React, { Component } from "react";

import { StocksItem } from "./StocksItem";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

class Stocks extends Component {
  render() {
    return (
      <div>
        <Table>
          <TableHead style={{ backgroundColor: "#1e88e5" }}>
            <TableRow>
              <TableCell align="center" style={{ color: "white" }}>SYMBOL</TableCell>
              <TableCell align="center" style={{ color: "white" }}>COMPANY</TableCell>
              <TableCell align="center" style={{ color: "white" }}>AMOUNT</TableCell>
              <TableCell align="center" style={{ color: "white" }}>PRICE</TableCell>
              <TableCell align="center" style={{ color: "white" }}>MAX PRICE STEP</TableCell>
              <TableCell align="center" style={{ color: "white" }}>DISTRIBUTION LAW</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { this.props.stocks.map((obj, i) =>
              <StocksItem key={i}
                          stock={obj}
                          socket={this.props.socket}
                          handleBuyDialogOpen={this.props.handleBuyDialogOpen ? this.props.handleBuyDialogOpen : null}
                          changeDistributionLaw={this.props.changeDistributionLaw}
                          isBiddingStarted={this.props.isBiddingStarted}
              />) }
          </TableBody>
        </Table>
      </div>
    )
  }
}

export { Stocks };