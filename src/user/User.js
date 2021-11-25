import React, {Component, useEffect} from "react";

import { io } from "socket.io-client";
import {useParams} from "react-router-dom";

function User(props) {
  const socket = io("http://localhost:8000");
  socket.on("connect", () => {
    console.log("Client: connect is established");
  });

  const params = useParams();
  const urlUsername = params.username;

  console.log("USER")

  useEffect(() => {
    console.log(socket.id);
  },
    [socket]);

  return (
    <div>
      <h3>Page of { urlUsername }</h3>
    </div>
  )
}

export { User }