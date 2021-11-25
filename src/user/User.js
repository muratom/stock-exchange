import React, {Component, useEffect, useRef} from "react";

import { io } from "socket.io-client";
import {useParams} from "react-router-dom";

const SOCKET_URL = "http://localhost:8000";

function User(props) {
  const params = useParams();
  const urlUsername = params.username;

  const socketRef = useRef(null);
  useEffect(() => {
    socketRef.current = io(SOCKET_URL);
    socketRef.current.on("connect", () => {
      console.log("Client: connection is established");
    });
  }, []);

  return (
    <div>
      <h3>Page of { urlUsername }</h3>
    </div>
  )
}

export { User }