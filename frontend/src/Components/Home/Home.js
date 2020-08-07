import React, { useContext, useEffect } from "react";
import { Grid } from "@material-ui/core";
import LinkedButton from "../LinkedButton/LinkedButton";
import styles from "./Home.module.css";
import TitleContext from "../../contexts/TitleContext";

const Home = () => {
  const { setHeaderTitle } = useContext(TitleContext);

  useEffect(() => {
    setHeaderTitle("Secrets");
  }, []);

  return (
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
  );
};

export default Home;
