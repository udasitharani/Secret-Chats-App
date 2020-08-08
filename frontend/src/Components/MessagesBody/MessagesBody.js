import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import MessageBubble from "../MessageBubble/MessageBubble";

const MessagesBody = (props) => {
  return (
    <Grid container direction="column" justify="flex-end" alignItems="center">
      {/* {props.messages} */}
      {props.messages.map((element, index) => {
        return <div key={index}>{element.text}</div>;
      })}
    </Grid>
  );
};

export default MessagesBody;
