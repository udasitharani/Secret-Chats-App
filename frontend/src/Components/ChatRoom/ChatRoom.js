import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { Grid } from "@material-ui/core";
import ChatInput from "../ChatInput/ChatInput";
import SnackBar from "../SnackBar/SnackBar";
import styles from "./ChatRoom.module.css";
import TitleContext from "../../contexts/TitleContext";
import RoomDataContext from "../../contexts/RoomDataContext";
import SnackBarContext from "../../contexts/SnackBarContext";

const ChatRoom = (props) => {
  const { setHeaderTitle } = useContext(TitleContext);
  const { roomData, setRoomData } = useContext(RoomDataContext);
  const {
    showSnackBar,
    setShowSnackBar,
    SnackBarSeverity,
    setSnackBarSeverity,
    SnackBarMessage,
    setSnackBarMessage,
  } = useContext(SnackBarContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState();
  let history = useHistory();

  const leaveRoom = async () => {
    console.log("1. leave room");
    if (roomData["roomkey"]) {
      console.log("2. Inside the if {}");
      const data = {
        roomkey: roomData["roomkey"],
        username: roomData["username"],
      };
      console.log("3. Let's fetch('leaveeee').");
      fetch("http://127.0.0.1:8080/api/chat-room/leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("4. fetch('leaveeee') left.");
      const roomname = roomData["roomname"];
      setSnackBarMessage("Left " + roomname + ".");
      setSnackBarSeverity("success");
      setShowSnackBar(true);
      console.log("5. Set snackbar data.");
    }
    console.log("6. Left the if.");
    setRoomData({});
    if (socket) {
      console.log("7. Inside the socket.");
      socket.disconnect();
    }
    console.log("8. Pushing history.");
    history.push("/");
    console.log("9. Pushed history.");
  };

  const sendMessage = () => {
    console.log(socket);
    socket.emit("pushMessage", { message: message, by: roomData["username"] });
    setMessage("");
  };

  useEffect(() => {
    if (roomData["roomkey"]) {
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
    } else {
      history.push("/join-room");
    }
    return () => {
      console.log("start leaving...........");
      leaveRoom();
      console.log("leftttttttttttttttttt...........");
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
        <div className={styles.messagesBody}>hello</div>
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
