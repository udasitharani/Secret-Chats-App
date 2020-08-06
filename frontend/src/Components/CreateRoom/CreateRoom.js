import React, { useState, useEffect } from "react";
import styles from "./CreateRoom.module.css";
import { Grid, TextField, Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const CreateRoom = () => {
  const [username, setUsername] = useState("");
  const [roomname, setRoomname] = useState("");
  let [cpiClasses, setCpiClasses] = useState("circularProgress");
  let [gridClasses, setGridClasses] = useState("grid");
  const [inProgress, setInProgress] = useState(false);

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
    setInProgress(true);
    const response = await fetch("http://127.0.0.1:8080/api/chat-room/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setInProgress(false);
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
        <TextField
          className={styles.inputField}
          label="Your Name"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          className={styles.inputField}
          label="Room Name"
          variant="outlined"
          value={roomname}
          onChange={(event) => setRoomname(event.target.value)}
        />
        <Button
          className={styles.submitButton}
          variant="outlined"
          color="secondary"
          onClick={postCreateRoom}
        >
          Next
        </Button>
      </Grid>
    </div>
  );
};

// const useProgressStyles = ;
// const useNonProgressStyles = ;

export default CreateRoom;
