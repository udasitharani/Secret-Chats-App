import React from "react";
import MessageBubble from "../MessageBubble/MessageBubble";
import styles from "./MessagesBody.module.css";

const MessagesBody = (props) => {
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
