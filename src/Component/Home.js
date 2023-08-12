import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "./SocketProvider";
import '../CssStyle/Home.css';

export default function Home(){
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div id="box">
      <div id="formBox">
        <form onSubmit={handleSubmitForm}>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required/> <br /> <br />
          <input type="text" id="room" value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Enter Room number" required/> <br /> <br />
          <button id="btn">Join</button>
        </form>
      </div>
      <div id='logo'>Video Conferencing</div>
    </div>
  );
};


