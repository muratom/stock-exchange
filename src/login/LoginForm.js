import React, { Component } from 'react';

import {Button, Input, InputAdornment, TextField} from "@mui/material";
import {AccountCircle, Password, PasswordOutlined} from "@mui/icons-material";

import styles from "./LoginForm.module.css"

// TODO: add visible/invisible option to the password field
export class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.username = React.createRef();
    this.password = React.createRef();

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {

  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className={styles.form}>
          <p>
            <TextField label="Username"
                       variant="outlined"
                       className={styles.inputs}
                       InputProps={{
                         startAdornment: (
                           <InputAdornment position="start">
                             <AccountCircle />
                           </InputAdornment>
                         )
                       }}
            />
          </p>
          <p>
            <TextField type="password"
                       label="Password"
                       variant="outlined"
                       className={styles.inputs}
                       InputProps={{
                         startAdornment: (
                           <InputAdornment position="start">
                             <Password />
                           </InputAdornment>
                         )
                       }}
            />
          </p>
          <p>
            <Button variant="outlined"
                    className={styles.inputs}>
              Enter
            </Button>
          </p>
        </form>
      </div>
    );
  }
}