import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import { Header } from "./header/Header"
import { LoginForm } from "./login/LoginForm";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div>
        <Header />
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<Navigate to="/login"/>}/>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/test" element={<h3>Test passed!</h3>} />
            </Routes>
          </div>
        </Router>
      </div>
    )
  }
}