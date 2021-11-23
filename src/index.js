import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from "react-redux";
import { Map } from "immutable"
import { App } from "./App.js"
import { createStore } from "redux";

// import {BrowserRouter as Router} from "react-router-dom";

// let reducer = function(state = Map(), action) {
//   switch (action.type) {
//     case "SET_STATE":
//       return state.merge(action.state);
//     case "ADD_PHONE":
//       return state.update("phones", (phones) => {
//         return phones.concat(action.phone);
//       });
//     case "DELETE_PHONE":
//       return state.update("phones",
//         (phones) => phones.filter(
//           (item) => item !== action.phone
//         )
//       );
//     default:
//       return state;
//   }
// }
//
// let store = createStore(reducer);
//
// store.dispatch({
//   type: "SET_STATE",
//   state: {
//     phones: [ "Xiaomi Mi 10", "Samsung Galaxy Note20" ]
//   }
// });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()