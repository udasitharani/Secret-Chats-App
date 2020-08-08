import React, { useState, useContext, useEffect } from "react";
import socketIOClient from "socket.io-client";
import TitleContext from "../../contexts/TitleContext";
import { Grid } from "@material-ui/core";
import ChatInput from "../ChatInput/ChatInput";
import SnackBar from "../SnackBar/SnackBar";
import styles from "./ChatRoom.module.css";
import RoomDataContext from "../../contexts/RoomDataContext";

const ChatRoom = (props) => {
  const { setHeaderTitle } = useContext(TitleContext);
  const { roomData, setRoomData } = useContext(RoomDataContext);
  const [showSnackBar, setShowSnackBar] = useState(true);
  const [SnackBarSeverity, setSnackBarSeverity] = useState("success");
  const [SnackBarMessage, setSnackBarMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState();

  const leaveRoom = async () => {
    const data = {
      roomkey: roomData["roomkey"],
      username: roomData["username"],
    };
    await fetch("http://127.0.0.1:8080/api/chat-room/leave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setRoomData({});
    props.location.state = {};
    socket.disconnect();
  };

  const sendMessage = () => {
    console.log(socket);
    socket.emit("pushMessage", { message: message, by: roomData["username"] });
    setMessage("");
  };

  useEffect(() => {
    if (roomData["roomkey"]) {
      setSnackBarMessage(props.location.state.snackBarMessage);
      setSnackBarSeverity(props.location.state.snackBarSeverity);
      setHeaderTitle(roomData.roomname);
      window.onbeforeunload = leaveRoom;

      const newSocket = socketIOClient("http://127.0.0.1:8080");
      setSocket(newSocket);
      console.log(newSocket);
      newSocket.emit("initialSetup", roomData["roomkey"]);
      newSocket.emit("getInitialMessageFlood");
      newSocket.on("initialMessageFlood", (data) => {
        setMessages(data);
      });
      newSocket.on("newMessage", (message) => {
        setMessages([...messages, message]);
      });
    }
    return async () => {
      await leaveRoom();
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Grid
        className={styles.containerGrid}
        container
        direction="column-reverse"
        justify="flex-start"
        align-items="center"
      >
        <ChatInput
          value={message}
          handleChange={(event) => setMessage(event.target.value)}
          handleSend={sendMessage}
        />
        <div className={styles.messagesContainer}>hello</div>
      </Grid>
      {SnackBarSeverity}
      <SnackBar
        open={showSnackBar}
        handleClose={() => setShowSnackBar(false)}
        severity={SnackBarSeverity}
        message={SnackBarMessage}
      />
    </div>
  );
};
export default ChatRoom;
