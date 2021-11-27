import React, { Component } from 'react';

import {AppBar, Toolbar, Typography} from "@mui/material";

export class Header extends Component {
  render() {
    return (
      <header>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ fontWeight: "bold", margin: "0 auto" }}>
               STOCK EXCHANGE
            </Typography>
          </Toolbar>
        </AppBar>
      </header>
    );
  }
}