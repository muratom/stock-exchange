import React, { Component, createRef} from 'react';
import { useNavigate } from "react-router"

import {Autocomplete, Button, TextField} from "@mui/material";

import styles from "./LoginForm.module.css"

const withRouter = WrappedComponent => props => {
  const navigate = useNavigate();
  return (
    <WrappedComponent
      {...props}
      navigate={navigate}
    />
  );
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    }
    this.username = createRef();
    this.password = createRef();

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const requestUrl = 'http://localhost:8000/login';

    const requestMetadata = {
      method: 'GET',
    };

    fetch(requestUrl, requestMetadata)
      .then(res => res.json())
      .then(res => {
        this.setState(() => {
          return { users: res }
        })
      });
  }

  onSubmit(e) {
    e.preventDefault();

    const requestUrl = 'http://localhost:8000/login';

    const postBody = {
      username: this.username.current.value,
      password: this.password.current.value
    };

    const requestMetadata = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody)
    };

    fetch(requestUrl, requestMetadata)
      .then(res => res.json())
      .then(res => {
        if (res.redirect) {
          return (
            this.props.navigate(res.url)
          )
        } else {
          alert(res.message);
        }
      });
  }

  render() {
    return (
      <div className={styles.container}>
        <form onSubmit={this.onSubmit}>
          <Autocomplete
            freeSolo
            options={this.state.users !== [] ? this.state.users.map((option) => option.username) : null}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={this.username}
                margin="normal"
                required
                fullWidth
                label="Username"
                autoFocus
              />
            )}
          />
          <TextField
            inputRef={this.password}
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </form>
      </div>
    );
  }
}

// function LoginForm() {
//   let username = useRef();
//   let password = useRef();
//   const navigate = useNavigate();
//
//   const onSubmit = (e) => {
//     e.preventDefault();
//
//     const requestUrl = 'http://localhost:8000/login';
//
//     const postBody = {
//       username: username.current.value,
//       password: password.current.value
//     };
//
//     const requestMetadata = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(postBody)
//     };
//
//     fetch(requestUrl, requestMetadata)
//       .then(res => res.json())
//       .then(res => {
//         if (res.redirect) {
//           return (
//             navigate(res.url)
//           )
//         } else {
//           alert(res.message);
//         }
//       });
//   };
//
//   return (
//     <div className={styles.container}>
//       <form onSubmit={onSubmit}>
//         <TextField
//           inputRef={username}
//           margin="normal"
//           required
//           fullWidth
//           label="Username"
//           autoFocus
//           autoComplete="username"
//         />
//         <TextField
//           inputRef={password}
//           margin="normal"
//           required
//           fullWidth
//           label="Password"
//           type="password"
//           autoComplete="current-password"
//         />
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           sx={{ mt: 3, mb: 2 }}
//         >
//           Sign In
//         </Button>
//       </form>
//     </div>
//   );
// }

export default withRouter(LoginForm);