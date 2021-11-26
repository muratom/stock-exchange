import React, { Component } from "react";
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
        <td>
          <select onChange={this.onChange}>
            <option value="Normal">Normal</option>
            <option value="Uniform">Uniform</option>
          </select>
        </td>

      );
    } else {
      distLawElem = <td>{ this.props.stock.distributionLaw }</td>
    }
    return (
      <tr>
        <td>{this.props.stock.symbol}</td>
        <td>{ this.props.stock.name }</td>
        <td>{ this.props.stock.amount }</td>
        <td>${ this.props.stock.price }</td>
        <td>${ this.props.stock.maxStep }</td>
        { distLawElem }
        {
          this.props.handleBuyDialogOpen
            ? <td><button onClick={() => { this.props.handleBuyDialogOpen(this.props.stock.symbol) }}>BUY</button></td>
            : null
        }
      </tr>
    )
  }
}

export { StocksItem };