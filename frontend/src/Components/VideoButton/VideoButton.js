import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IconButton, SvgIcon } from "@material-ui/core";
import VideoButtonContext from "../../contexts/VideoButtonContext";

const VideoButton = () => {
  const { showVideoButton, onVideoButtonClick } = useContext(
    VideoButtonContext
  );
  if (showVideoButton) {
    return (
      <IconButton onClick={onVideoButtonClick}>
        <SvgIcon>
          <path
            style={{ fill: "#eeeeee" }}
            d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"
          />
        </SvgIcon>
      </IconButton>
    );
  } else {
    return <span></span>;
  }
};

export default VideoButton;
