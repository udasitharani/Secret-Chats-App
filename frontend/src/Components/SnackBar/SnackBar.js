import React, { useEffect } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const SnackBar = (props) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={5000}
      onClose={props.handleClose}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={props.handleClose}
        severity={props.severity}
      >
        {props.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackBar;
