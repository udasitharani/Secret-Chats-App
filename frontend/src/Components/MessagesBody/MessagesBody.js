import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import MessageBubble from "../MessageBubble/MessageBubble";
import styles from "./MessagesBody.module.css";

const MessagesBody = (props) => {
  useEffect(() => {
    // props.messages.map((element, index) => {
    //   console.log(element.timestamp);
    //   console.log(new Date(element.timestamp));
    // });
  });

  return (
    <div className={styles.body}>
      {props.messages.map((element, index) => {
        return (
          <MessageBubble
            key={element.id}
            text={element.text}
            by={element.by}
            timestamp={element.timestamp}
          />
        );
      })}
    </div>
  );
};

export default MessagesBody;
