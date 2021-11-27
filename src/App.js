import React, { Component } from 'react';

import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";

import { Header } from "./header/Header"

import LoginForm from "./login/LoginForm";
import { Admin } from "./admin/Admin";
import User from "./user/User";

// TODO: use Redux to add routing capability
export class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />}/>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/user/:username" element={<User />} />
              <Route path="*" element={<h1 style={{margin: "0 auto"}}>Not found</h1>} />
            </Routes>
          </div>
        </Router>
      </div>
    )
  }
}