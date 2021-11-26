import React, { Component } from "react";

import { StocksItem } from "./StocksItem";

class Stocks extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   stocks: []
    // };
  }

  componentDidMount() {
    // console.log("Fetching the stocks from the server");
    // fetch(`http://localhost:8000/stocks`, { method: "GET" })
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState((state, props) => {
    //       return { stocks: res.stocks };
    //     });
    //   });
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
                          handleOpen={this.props.handleOpen}/>) }
          </tbody>

        </table>
      </div>
    )
  }
}

export { Stocks };