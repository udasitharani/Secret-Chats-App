import React from "react";
import { Button } from "@material-ui/core";
import styles from "./SubmitButton.module.css";

const SubmitButton = (props) => {
  return (
    <Button
      className={styles.submitButton}
      variant="outlined"
      color="secondary"
      onClick={props.onClick}
    >
      {props.label}
    </Button>
  );
};

export default SubmitButton;
