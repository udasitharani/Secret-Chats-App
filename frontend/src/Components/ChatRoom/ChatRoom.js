import React, { useContext, useEffect } from "react";
import TitleContext from "../../contexts/TitleContext";

const ChatRoom = (props) => {
  const { setHeaderTitle } = useContext(TitleContext);

  useEffect(() => {
    setHeaderTitle(props.location.state.roomname);
  }, [props.location.state.roomname]);

  return <div> {props.location.state.roomname} </div>;
};
export default ChatRoom;
