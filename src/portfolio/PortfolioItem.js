import React, { Component } from "react";
import {Button, TableCell, TableRow} from "@mui/material";

class PortfolioItem extends Component {
  render() {
    return (
      <TableRow>
        <TableCell align="center" style={{ fontWeight: "bold", fontSize: "16px", fontStyle: "italic" }}>{this.props.symbol}</TableCell>
        <TableCell align="center">{this.props.amount}</TableCell>
        <TableCell align="center" style={{ color: "green" }}>${this.props.amount * this.props.price}</TableCell>
        {
          this.props.handleSellDialogOpen && this.props.sellAll &&
          <TableCell align="center" width="20%">
            <Button variant="outlined" style={{ marginRight: "5px" }} onClick={() => { this.props.handleSellDialogOpen(this.props.symbol) }}>SELL</Button>
            <Button variant="outlined" style={{ marginLeft: "5px" }} onClick={() => { this.props.sellAll(this.props.symbol, this.props.amount) }}>SELL ALL</Button>
          </TableCell>
        }
      </TableRow>
    )
  }
}

export { PortfolioItem };