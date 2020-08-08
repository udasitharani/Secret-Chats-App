import React, { useContext, useEffect } from "react";
import { Grid } from "@material-ui/core";
import LinkedButton from "../LinkedButton/LinkedButton";
import styles from "./Home.module.css";
import SnackBar from "../SnackBar/SnackBar";
import TitleContext from "../../contexts/TitleContext";
import SnackBarContext from "../../contexts/SnackBarContext";

const Home = () => {
  const { setHeaderTitle } = useContext(TitleContext);
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
      <div className={styles.container}>
        <div>
          <LinkedButton to="/create-room" text="Create Room" />
        </div>
        <div>
          <LinkedButton to="/join-room" text="Join Room" />
        </div>
      </div>
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
