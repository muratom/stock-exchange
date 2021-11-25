import React, { Component } from 'react';

// import {Button, Input, InputAdornment, TextField} from "@mui/material";
// import {AccountCircle, Password, PasswordOutlined} from "@mui/icons-material";

import styles from "./LoginForm.module.css"

import { useNavigate } from "react-router-dom";

// TODO: add visible/invisible option to the password field
function LoginForm(props) {
  let username = React.createRef();
  let password = React.createRef();
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
      <form onSubmit={onSubmit} className={styles.form}>
        <label>Username:&nbsp;</label>
        <input ref={username} className={styles.inputs}/>
        <br/>
        <label>Password:&nbsp;</label>
        <input ref={password} type="password" className={styles.inputs}/>
        <br/>
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}

export { LoginForm };