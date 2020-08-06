import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import styles from "./AppBar.module.css";
import TitleContext from "../../contexts/TitleContext";

const AppHeader = () => {
  const { headerTitle } = useContext(TitleContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={styles.title} variant="h4">
          <Link to="/">{headerTitle}</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
