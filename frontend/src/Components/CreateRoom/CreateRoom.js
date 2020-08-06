import React, { useState } from "react";
import styles from "./CreateRoom.module.css";
import { Grid, TextField, Button } from "@material-ui/core";

const CreateRoom = () => {
  const [username, setUsername] = useState("");
  const [roomname, setRoomname] = useState("");
  return (
    <Grid
      className={styles.container}
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
      >
        Continue
      </Button>
    </Grid>
  );
};

export default CreateRoom;
