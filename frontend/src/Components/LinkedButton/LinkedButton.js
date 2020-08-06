import React from "react";
import { Button } from "@material-ui/core";
import styles from "./LinkedButton.module.css";
import { Link } from "react-router-dom";

const PrimaryButton = (props) => {
  return (
    <Link to={props.to}>
      <Button
        className={styles.primaryButton}
        variant="contained"
        color="secondary"
        disableElevation
      >
        {props.text}
      </Button>
    </Link>
  );
};

// const useStyles = makeStyles((theme) => ({
//   primaryButton: {
//     width: "40vw",
//     height: "10vh",
//     margin: "2vh",
//     fontSize: "3vh",
//   },
// }));

export default PrimaryButton;
