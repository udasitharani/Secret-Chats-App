import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, CircularProgress } from "@material-ui/core";
import styles from "./JoinRoom.module.css";
import SnackBar from "../SnackBar/SnackBar";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";

const CreateRoom = (props) => {
  const [username, setUsername] = useState("");
  const [roomkey, setroomkey] = useState("");
  const [cpiClasses, setCpiClasses] = useState("circularProgress");
  const [gridClasses, setGridClasses] = useState("grid");
  const [inProgress, setInProgress] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [SnackBarSeverity, setSnackBarSeverity] = useState("");
  const [SnackBarMessage, setSnackBarMessage] = useState("");
  let history = useHistory();

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
      setInProgress(false);
      if (response.status === 200) {
        const responseJSON = await response.json();
        history.push({
          pathname: "/chat-room",
          state: {
            snackBarSeverity: "success",
            snackBarMessage:
              "Successfully joined '" +
              responseJSON["roomname"] +
              "' chatroom.",
            roomkey: responseJSON["roomkey"],
            roomname: responseJSON["roomname"],
            // setHeaderTitle: props.setHeaderTitle,
          },
        });
      } else if (
        response.status === 400 ||
        response.status === 404 ||
        response.status === 500
      ) {
        setSnackBarMessage((await response.json())["message"]);
        setSnackBarSeverity("error");
        //   } else if (response.status === 404) {
        //     setSnackBarMessage(response.json["message"]);
        //     setSnackBarSeverity("error");
        //   } else if (response.status === 500) {
        //     setSnackBarMessage("Internal server error occurred. Please try again.");
        //     setSnackBarSeverity("error");
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
    }
    setShowSnackBar(true);
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
