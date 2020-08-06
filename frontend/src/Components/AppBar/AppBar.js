import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import styles from "./AppBar.module.css";

const AppHeader = (props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={styles.title} variant="h4">
          <Link to="/">{props.title}</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
