import React, { useEffect, useContext } from "react";
import RoomDataContext from "../../contexts/RoomDataContext";
import styles from "./MessageBubble.module.css";

const MessageBubble = (props) => {
  const { roomData } = useContext(RoomDataContext);
  const className =
    props.by == roomData["username"]
      ? styles.myBubble
      : props.by == ""
      ? styles.globalBubble
      : styles.notMyBubble;

  return (
    <div className={className}>
      <div
        className={
          props.by == roomData["username"]
            ? styles.none
            : props.by == ""
            ? styles.none
            : styles.sender
        }
      >
        {props.by}
      </div>
      <span>{props.text}</span>
      <div className={styles.timestamp}>{props.timestamp}</div>
    </div>
  );
};

export default MessageBubble;
