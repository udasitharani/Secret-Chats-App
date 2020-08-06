import React from "react";
import { Grid } from "@material-ui/core";
import PrimaryButton from "./PrimaryButton";

const Home = () => {
  return (
    <Grid
      style={{ height: "100%" }}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <div>
        <PrimaryButton to="/create-room" text="Create Room" />
      </div>
      <div>
        <PrimaryButton to="/join-room" text="Join Room" />
      </div>
    </Grid>
  );
};

export default Home;
