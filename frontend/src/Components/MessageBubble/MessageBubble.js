import React, { useContext } from "react";
import RoomDataContext from "../../contexts/RoomDataContext";
import styles from "./MessageBubble.module.css";

const MessageBubble = (props) => {
  const { roomData } = useContext(RoomDataContext);
  const className =
    props.by === roomData["username"]
      ? styles.myBubble
      : props.by === ""
      ? styles.globalBubble
      : styles.notMyBubble;
  const timestamp = new Date(props.timestamp);
  const hours = String(timestamp.getHours()).padStart(2, "0");
  const minutes = String(timestamp.getMinutes()).padStart(2, "0");

  return (
    <div className={className}>
      <div
        className={
          props.by === roomData["username"]
            ? styles.none
            : props.by === ""
            ? styles.none
            : styles.sender
        }
      >
        {props.by}
      </div>
      <span>{props.text}</span>
      <div className={props.by === "" ? styles.none : styles.timestamp}>
        {hours + ":" + minutes}
      </div>
    </div>
  );
};

export default MessageBubble;
