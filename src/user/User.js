import React, { Component } from "react";
import {useParams } from "react-router";

import { io } from "socket.io-client";
import {Stocks} from "../stock/Stocks";
import BuyDialog from "./BuyDialog";
import {Portfolio} from "../portfolio/Portfolio";

const withRouter = WrappedComponent => props => {
  const params = useParams();
  // etc... other react-router-dom v6 hooks

  return (
    <WrappedComponent
      {...props}
      params={params}
      // etc...
    />
  );
};

const SOCKET_URL = "http://localhost:8000";

class User extends Component {
  constructor(props) {
    super(props);

    this.urlUsername = "";
    this.socket = io(SOCKET_URL)

    this.state = {
      user: {},
      stocks: [],
      isDialogOpen: false,
      currentStockSymbol: "",
    };

    this.getUser = this.getUser.bind(this);
    this.setupSocket = this.setupSocket.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
  }

  componentDidMount() {
    this.setupSocket();
    this.urlUsername = this.props.params.username;
    this.getUser(this.urlUsername);
    this.getStocks();
  }

  getUser(username) {
    console.log("Fetching the user data from the server");
    this.socket.emit("get-user", username);
  }

  getStocks() {
    console.log("Fetching the stocks data from the server");
    this.socket.emit("get-stocks");
  }

  setupSocket() {
    this.socket.on("connect", () => {
      console.log("Client: connection is established");
    });

    this.socket.on("send-user", (res) => {
      switch (res.status) {
        case "OK":
          this.setState((state, props) => {
            return { user: res.user }
          });
          this.socket.emit("greet-user", this.state.user);
          break;
        case "Error":
          alert(res.msg)
          break;
        default:
          break;
      }
    });

    this.socket.on("send-stocks", (res) => {
      this.setState((state, props) => {
        return { stocks: res }
      });
    });

    this.socket.on("buy-stocks-rejected", (msg) => {
      alert(msg);
    });

    this.socket.on("buy-stocks-accepted", (user, stocks) => {
      console.log(`${user.username} bought ${stocks.symbol} stocks`);
      this.handleClose();
      this.setState((state, props) => {
        console.log("UPDATED USER", user);
        return { user: user };
      });
    });
  }

  // componentDidUpdate(prevProps, prevState) {}

  handleOpen(symbol) {
    this.setState({
      currentStockSymbol: symbol,
      isDialogOpen: true
    });
  }

  handleClose() {
    this.setState({ isDialogOpen: false });
  }

  handleBuy(symbol, amount) {
    this.socket.emit("buy-stocks-request", symbol, amount);
  }

  // TODO: add a profit in percentage
  render() {
    return (
      <div>
        <h3>Welcome, { this.state.user.firstName }!</h3>
        <p>Start budget: ${ this.state.user.startBudget }</p>
        <p>Current budget: ${ this.state.user.curBudget }</p>
        <Stocks socket={this.socket}
                stocks={this.state.stocks}
                handleOpen={this.handleOpen}/>
        <Portfolio purchasedStocks={this.state.user.purchasedStocks ? this.state.user.purchasedStocks : []}
                   stocks={this.state.stocks}/>
        <BuyDialog symbol={this.state.currentStockSymbol}
                   open={this.state.isDialogOpen}
                   handleClose={this.handleClose}
                   handleBuy={this.handleBuy}/>
      </div>
    )
  }
}

export default withRouter(User);

// function User(props) {
//   const params = useParams();
//   const urlUsername = params.username;
//
//   const [user, setUser] = useState({});
//
//   const socketRef = useRef(null);
//   useEffect(  () => {
//     console.log("Fetching the data from the server");
//     fetch(`${SOCKET_URL}/user/${urlUsername}`, { method: "GET" })
//       .then(res => res.json())
//       .then(res => {
//         setUser(res);
//       })
//   }, []);
//
//   useEffect(() => {
//     socketRef.current = io(SOCKET_URL);
//     socketRef.current.on("connect", () => {
//       console.log("Client: connection is established");
//     });
//     console.log(user)
//     socketRef.current.emit("greet-user", user);
//   }, [user]);
//
//   // const click = (e) => {
//   //   setUser({...user, firstName: "Tom"});
//   // }
//
//   return (
//     <div>
//       <h3>Page of { urlUsername }</h3>
//       {/*<button onClick={click}>Click me</button>*/}
//     </div>
//   )
// }
//
// export { User }