import React from "react";
import {
  InputAdornment,
  IconButton,
  OutlinedInput,
  SvgIcon,
} from "@material-ui/core";
import styles from "./ChatInput.module.css";

const ChatInput = (props) => {
  return (
    <OutlinedInput
      multiline
      rowsMax={9}
      value={props.value}
      onChange={props.handleChange}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            onClick={props.handleSend}
            aria-label="send message"
            edge="end"
          >
            <SvgIcon color="primary">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </SvgIcon>
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default ChatInput;
