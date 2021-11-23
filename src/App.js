import React, { Component } from 'react';

import { Header } from "./header/Header"
import { LoginForm } from "./login/LoginForm";

export class App extends Component {
  render() {
    return <div>
      <Header />
      <LoginForm />
    </div>
  }
}