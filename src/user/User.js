import React, { Component } from "react";
import {useParams } from "react-router";

import { io } from "socket.io-client";

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

    this.socket = io(SOCKET_URL);
    this.urlUsername = "";

    this.state = {
      user: {}
    };

    this.fetchUserData = this.fetchUserData.bind(this);
  }

  componentDidMount() {
    this.urlUsername = this.props.params.username;
    this.fetchUserData(this.urlUsername);
  }

  fetchUserData(username) {
    console.log("Fetching the data from the server");
    fetch(`${SOCKET_URL}/user/${username}`, { method: "GET" })
      .then(res => res.json())
      .then(res => {
        this.setState((state, props) => {
          return { user: res }
        }, () => {
          this.socket.on("connect", () => {
            console.log("Client: connection is established");
          });
          this.socket.emit("greet-user", this.state.user);
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div>
        <h3>Page of { this.urlUsername }</h3>
        {/*<button onClick={click}>Click me</button>*/}
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