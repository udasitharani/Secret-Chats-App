import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Grid, CircularProgress } from "@material-ui/core";
import styles from "./JoinRoom.module.css";
import SnackBar from "../SnackBar/SnackBar";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";
import TitleContext from "../../contexts/TitleContext";
import RoomDataContext from "../../contexts/RoomDataContext";
import SnackBarContext from "../../contexts/SnackBarContext";

const CreateRoom = (props) => {
  const [username, setUsername] = useState("");
  const [roomkey, setroomkey] = useState("");
  const [cpiClasses, setCpiClasses] = useState("circularProgress");
  const [gridClasses, setGridClasses] = useState("grid");
  const [inProgress, setInProgress] = useState(false);
  let history = useHistory();
  const { setHeaderTitle } = useContext(TitleContext);
  const { setRoomData } = useContext(RoomDataContext);
  const {
    showSnackBar,
    setShowSnackBar,
    SnackBarSeverity,
    setSnackBarSeverity,
    SnackBarMessage,
    setSnackBarMessage,
  } = useContext(SnackBarContext);

  useEffect(() => {
    setHeaderTitle("Secrets");
  });

  useEffect(() => {
    if (inProgress) {
      setCpiClasses(styles.inProgressCircularProgress);
      setGridClasses(styles.grid + " " + styles.inProgressGrid);
    } else {
      setCpiClasses(styles.circularProgress);
      setGridClasses(styles.grid);
    }
  }, [inProgress]);

  const postCreateRoom = async () => {
    const data = { username, roomkey };
    if (username && roomkey) {
      setInProgress(true);
      const response = await fetch("http://127.0.0.1:8080/api/chat-room/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseJSON = await response.json();
      setInProgress(false);
      if (response.status === 200) {
        setRoomData({
          roomkey: roomkey,
          roomname: responseJSON["roomname"],
          username: username,
        });
        setSnackBarMessage(
          "Joined '" + responseJSON["roomname"] + "' chatroom."
        );
        setSnackBarSeverity("success");
        history.push("/chat-room");
      } else if (
        response.status === 400 ||
        response.status === 404 ||
        response.status === 500
      ) {
        setSnackBarMessage(responseJSON["message"]);
        setSnackBarSeverity("error");
        setShowSnackBar(true);
      }
    } else {
      if (!username && !roomkey) {
        setSnackBarMessage("Please provide username and roomkey.");
        setSnackBarSeverity("warning");
      } else if (!username) {
        setSnackBarMessage("Please provide User Name.");
        setSnackBarSeverity("warning");
      } else if (!roomkey) {
        setSnackBarMessage("Please provide Room Key.");
        setSnackBarSeverity("warning");
      }
      setShowSnackBar(true);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <CircularProgress className={cpiClasses} />
      <Grid
        className={gridClasses}
        direction="column"
        container
        justify="center"
        alignItems="center"
      >
        <InputField
          label="Your Name"
          value={username}
          handleChange={(event) => setUsername(event.target.value)}
        />
        <InputField
          label="Room Key"
          value={roomkey}
          handleChange={(event) => setroomkey(event.target.value)}
        />
        <SubmitButton onClick={postCreateRoom} label="Next" />
      </Grid>
      <SnackBar
        open={showSnackBar}
        handleClose={() => setShowSnackBar(false)}
        severity={SnackBarSeverity}
        message={SnackBarMessage}
      ></SnackBar>
    </div>
  );
};

export default CreateRoom;
