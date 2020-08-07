import React, { useState, useContext, useEffect } from "react";
import TitleContext from "../../contexts/TitleContext";
import { Grid, Snackbar } from "@material-ui/core";
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

  const leaveRoom = async () => {
    const data = {
      roomkey: roomData["roomkey"],
      username: roomData["username"],
    };
    const response = await fetch("http://127.0.0.1:8080/api/chat-room/leave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setRoomData({});
    props.location.state = {};
  };

  useEffect(() => {
    if (roomData["roomkey"]) {
      setSnackBarMessage(props.location.state.snackBarMessage);
      setSnackBarSeverity(props.location.state.snackBarSeverity);
      setHeaderTitle(roomData.roomname);
      window.onbeforeunload = leaveRoom;
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
        <ChatInput />
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
