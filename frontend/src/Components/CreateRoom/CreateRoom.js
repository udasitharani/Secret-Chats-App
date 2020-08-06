import React from "react";
import styles from "./CreateRoom.module.css";
import { Grid, TextField } from "@material-ui/core";

const CreateRoom = () => {
  return (
    <Grid
      style={{ height: "100%" }}
      direction="column"
      container
      justify="center"
      alignItems="center"
    >
      <TextField label="Your Name" variant="outlined" />
      <TextField label="Room Name" variant="outlined" />
    </Grid>
  );
};

export default CreateRoom;
