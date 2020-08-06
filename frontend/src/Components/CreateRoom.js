import React from "react";
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
