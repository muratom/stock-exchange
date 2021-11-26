import React, { Component } from "react";
import {Button, TableCell, TableRow} from "@mui/material";

class PortfolioItem extends Component {
  render() {
    return (
      <TableRow>
        <TableCell align="center">{this.props.symbol}</TableCell>
        <TableCell align="center">{this.props.amount}</TableCell>
        <TableCell align="center">${this.props.amount * this.props.price}</TableCell>
        {
          this.props.handleSellDialogOpen &&
          <TableCell align="center">
            <Button variant="outlined" onClick={() => { this.props.handleSellDialogOpen(this.props.symbol) }}>SELL</Button>
          </TableCell>
        }
      </TableRow>
    )
  }
}

export { PortfolioItem };