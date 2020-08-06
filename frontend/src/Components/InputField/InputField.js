import React from "react";
import { TextField } from "@material-ui/core";
import styles from "./InputField.module.css";

const InputField = (props) => {
  return (
    <TextField
      className={styles.inputField}
      label={props.label}
      variant="outlined"
      value={props.value}
      onChange={props.handleChange}
    />
  );
};

export default InputField;
