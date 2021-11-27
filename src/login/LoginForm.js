import React, {useRef} from 'react';

import styles from "./LoginForm.module.css"

import { useNavigate } from "react-router-dom";
import {Button, TextField} from "@mui/material";

// TODO: add visible/invisible option to the password field
function LoginForm() {
  let username = useRef();
  let password = useRef();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const requestUrl = 'http://localhost:8000/login';

    const postBody = {
      username: username.current.value,
      password: password.current.value
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
            navigate(res.url)
          )
        } else {
          alert(res.message);
        }
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <TextField
          inputRef={username}
          margin="normal"
          required
          fullWidth
          label="Username"
          autoFocus
          autoComplete="username"
        />
        <TextField
          inputRef={password}
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

export { LoginForm };