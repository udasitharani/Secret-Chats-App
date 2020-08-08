import React, { useState, useContext, useEffect } from "react";
import { Grid, Snackbar } from "@material-ui/core";
import LinkedButton from "../LinkedButton/LinkedButton";
import styles from "./Home.module.css";
import SnackBar from "../SnackBar/SnackBar";
import TitleContext from "../../contexts/TitleContext";
import RoomDataContext from "../../contexts/RoomDataContext";
import SnackBarContext from "../../contexts/SnackBarContext";

const Home = () => {
  const { setHeaderTitle } = useContext(TitleContext);
  const { roomData, setRoomData } = useContext(RoomDataContext);
  const {
    showSnackBar,
    setShowSnackBar,
    SnackBarSeverity,
    SnackBarMessage,
  } = useContext(SnackBarContext);

  useEffect(() => {
    setHeaderTitle("Secrets");
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Grid
        className={styles.container}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <div>
          <LinkedButton to="/create-room" text="Create Room" />
        </div>
        <div>
          <LinkedButton to="/join-room" text="Join Room" />
        </div>
      </Grid>
      <SnackBar
        open={showSnackBar}
        handleClose={() => setShowSnackBar(false)}
        severity={SnackBarSeverity}
        message={SnackBarMessage}
      />
    </div>
  );
};

export default Home;
