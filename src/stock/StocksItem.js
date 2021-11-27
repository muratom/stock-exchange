import React, { Component } from "react";
import {Button, MenuItem, Select, TableCell, TableRow} from "@mui/material";
// import {io} from "socket.io-client";
//
// const SOCKET_URL = "http://localhost:8000";

class StocksItem extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.changeDistributionLaw(this.props.stock.symbol, e.target.value);
  }

  render() {
    let distLawElem;
    if (this.props.changeDistributionLaw) {
      distLawElem = (
        <TableCell align="center">
          <Select
            value={this.props.stock.distributionLaw}
            onChange={this.onChange}
          >
            <MenuItem value="Normal">Normal</MenuItem>
            <MenuItem value="Uniform">Uniform</MenuItem>
          </Select>
        </TableCell>

      );
    } else {
      distLawElem = <TableCell align="center" style={{ color: "red" }}>{ this.props.stock.distributionLaw }</TableCell>
    }
    return (
      <TableRow>
        <TableCell align="center" style={{ fontWeight: "bold", fontSize: "16px", fontStyle: "italic" }}>{this.props.stock.symbol}</TableCell>
        <TableCell align="center">{ this.props.stock.name }</TableCell>
        <TableCell align="center">{ this.props.stock.amount }</TableCell>
        <TableCell align="center" style={{ color: "green" }}>${ this.props.stock.price }</TableCell>
        <TableCell align="center" style={{ color: "green" }}>${ this.props.stock.maxStep }</TableCell>
        { distLawElem }
        {
          this.props.handleBuyDialogOpen
            ? <TableCell align="center"><Button variant="outlined" onClick={() => { this.props.handleBuyDialogOpen(this.props.stock.symbol) }}>BUY</Button></TableCell>
            : null
        }
      </TableRow>
    )
  }
}

export { StocksItem };