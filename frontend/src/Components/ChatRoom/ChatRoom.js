import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { Grid } from "@material-ui/core";
import ChatInput from "../ChatInput/ChatInput";
import SnackBar from "../SnackBar/SnackBar";
import MessagesBody from "../MessagesBody/MessagesBody";
import VideoCall from "../VideoCall/VideoCall";
import styles from "./ChatRoom.module.css";
import TitleContext from "../../contexts/TitleContext";
import RoomDataContext from "../../contexts/RoomDataContext";
import SnackBarContext from "../../contexts/SnackBarContext";
import VideoButtonContext from "../../contexts/VideoButtonContext";

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
  const { setShowVideoButton, setOnVideoButtonClick } = useContext(
    VideoButtonContext
  );
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState();
  const [startVideoCall, setStartVideoCall] = useState(false);
  const startVideoCallRef = useRef();
  startVideoCallRef.current = startVideoCall;
  let history = useHistory();

  const leaveRoom = async () => {
    if (roomData["roomkey"]) {
      const data = {
        roomkey: roomData["roomkey"],
        username: roomData["username"],
      };
      fetch("/api/chat-room/leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // fetch("http://127.0.0.1:8080/api/chat-room/leave", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });
      const roomname = roomData["roomname"];
      setSnackBarMessage("Left " + roomname + ".");
      setSnackBarSeverity("success");
      setShowSnackBar(true);
      setShowVideoButton(false);
      setOnVideoButtonClick(() => {});
    }
    setRoomData({});
    if (socket) {
      socket.disconnect();
    }
    history.push("/");
  };

  const sendMessage = () => {
    if (message) {
      socket.emit("pushMessage", {
        text: message,
        by: roomData["username"],
      });
    }
    setMessage("");
  };

  useEffect(() => {
    if (roomData["roomkey"]) {
      setHeaderTitle(roomData.roomname);
      window.onbeforeunload = leaveRoom;

      // const newSocket = socketIOClient("/");
      const newSocket = socketIOClient("http://127.0.0.1:8080/");
      setSocket(newSocket);
      newSocket.emit("initialSetup", roomData["roomkey"]);

      newSocket.on("newMessage", (message) => {
        try {
          if (!startVideoCall) {
            document.querySelector("#bottom").scrollIntoView(true);
          }
        } catch (e) {
          console.log(e);
        }
        (async () => {
          await setMessages([...messages, ...message]);
        })();
      });
      setShowVideoButton(true);
      setOnVideoButtonClick(() => {
        return () => {
          if (startVideoCallRef.current) {
            setStartVideoCall(false);
            console.log(startVideoCallRef.current);
          } else {
            console.log(startVideoCallRef.current);
            setStartVideoCall(true);
          }
        };
      });
    } else {
      history.push("/join-room");
    }
    return () => {
      leaveRoom();
    };
  }, []);

  if (!startVideoCallRef.current) {
    return (
      <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
        <Grid
          className={styles.containerGrid}
          container
          direction="column"
          justify="flex-end"
          align-items="center"
          wrap="nowrap"
        >
          <div className={styles.messagesBody}>
            <MessagesBody messages={messages} />
            <div id="bottom" className={styles.bottom} />
          </div>
          <ChatInput
            value={message}
            handleChange={(event) => setMessage(event.target.value)}
            handleSend={sendMessage}
          />
        </Grid>
        <SnackBar
          open={showSnackBar}
          handleClose={() => setShowSnackBar(false)}
          severity={SnackBarSeverity}
          message={SnackBarMessage}
        />
      </div>
    );
  } else {
    return (
      <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
        <VideoCall socket={socket} />
      </div>
    );
  }
};
export default ChatRoom;
