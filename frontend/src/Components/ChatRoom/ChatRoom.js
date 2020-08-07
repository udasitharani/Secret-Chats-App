import React, { useContext, useEffect } from "react";
import TitleContext from "../../contexts/TitleContext";
import { Grid } from "@material-ui/core";
import ChatInput from "../ChatInput/ChatInput";
import styles from "./ChatRoom.module.css";

const ChatRoom = (props) => {
  const { setHeaderTitle } = useContext(TitleContext);
  useEffect(() => {
    setHeaderTitle(props.location.state.roomname);
  }, [props.location.state.roomname]);

  return (
    <Grid
      className={styles.containerGrid}
      container
      direction="column-reverse"
      justify="flex-start"
      align-items="center"
    >
      <ChatInput />
      <div className={styles.messagesContainer}>hello</div>
    </Grid>
  );
};
export default ChatRoom;
