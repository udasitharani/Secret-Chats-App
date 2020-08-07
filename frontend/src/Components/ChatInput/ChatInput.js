import React from "react";
import {
  InputAdornment,
  IconButton,
  OutlinedInput,
  SvgIcon,
} from "@material-ui/core";
import styles from "./ChatInput.module.css";

const ChatInput = () => {
  return (
    <OutlinedInput
      multiline
      rowsMax={9}
      endAdornment={
        <InputAdornment position="end">
          <IconButton aria-label="send message" edge="end">
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
