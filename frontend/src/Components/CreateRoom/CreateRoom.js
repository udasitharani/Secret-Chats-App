import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Grid, CircularProgress } from "@material-ui/core";
import styles from "./CreateRoom.module.css";
import SnackBar from "../SnackBar/SnackBar";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";
import TitleContext from "../../contexts/TitleContext";
import RoomDataContext from "../../contexts/RoomDataContext";

const CreateRoom = (props) => {
  const [username, setUsername] = useState("");
  const [roomname, setRoomname] = useState("");
  const [cpiClasses, setCpiClasses] = useState("circularProgress");
  const [gridClasses, setGridClasses] = useState("grid");
  const [inProgress, setInProgress] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [SnackBarSeverity, setSnackBarSeverity] = useState("success");
  const [SnackBarMessage, setSnackBarMessage] = useState("");
  let history = useHistory();
  const { setHeaderTitle } = useContext(TitleContext);
  const { roomData, setRoomData } = useContext(RoomDataContext);

  useEffect(() => {
    setHeaderTitle("Secrets");
  }, []);

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
    const data = { username, roomname };
    if (username && roomname) {
      setInProgress(true);
      const response = await fetch(
        "http://127.0.0.1:8080/api/chat-room/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responseJSON = await response.json();
      setInProgress(false);
      if (response.status === 200) {
        await navigator.clipboard.writeText(responseJSON["roomkey"]);
        setRoomData({
          roomkey: responseJSON["roomkey"],
          roomname: roomname,
          username: username,
        });
        await history.push({
          pathname: "/chat-room",
          state: {
            snackBarSeverity: "success",
            snackBarMessage:
              "Successfully created '" +
              roomname +
              "' chatroom. Room Key: '" +
              responseJSON["roomkey"] +
              "' has been copied to your clipboard.",
          },
        });
      } else if (response.status === 400) {
        setSnackBarMessage("User-Name/Room-Name not provided.");
        setSnackBarSeverity("error");
        setShowSnackBar(true);
      } else if (response.status === 500) {
        setSnackBarMessage("Internal server error occurred. Please try again.");
        setSnackBarSeverity("error");
        setShowSnackBar(true);
      }
    } else {
      if (!username && !roomname) {
        setSnackBarMessage("Please provide username and roomname.");
        setSnackBarSeverity("warning");
      } else if (!username) {
        setSnackBarMessage("Please provide User Name.");
        setSnackBarSeverity("warning");
      } else if (!roomname) {
        setSnackBarMessage("Please provide Room Name.");
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
          label="Room Name"
          value={roomname}
          handleChange={(event) => setRoomname(event.target.value)}
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
