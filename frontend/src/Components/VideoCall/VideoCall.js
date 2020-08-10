import React, { useEffect, useContext } from "react";
import styles from "./VideoCall.module.css";
import RoomDataContext from "../../contexts/RoomDataContext";

const VideoCall = (props) => {
  const { roomData } = useContext(RoomDataContext);
  const peers = {};
  let myVideoStream;
  const socket = props.socket;

  useEffect(() => {
    const myPeer = new window.Peer(undefined, {
      host: "/",
      port: "3001",
      path: "/video",
    });
    const videoGrid = document.querySelector("#video-grid");
    const myVideo = document.createElement("video");
    myVideo.muted = true;
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        addVideoStream(myVideo, stream);
        myVideoStream = stream;
      });
    myPeer.on("call", (call) => {
      call.answer(myVideoStream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("new-user", (userId) => {
      setTimeout(() => {
        connectToNewUser(userId, myVideoStream);
      }, 1000);
    });

    socket.on("close-user", (userID) => {
      if (peers[userID]) {
        peers[userID].close();
      }
    });

    myPeer.on("open", (id) => {
      socket.emit("join-video", roomData["roomkey"], id);
    });

    function connectToNewUser(userId, stream) {
      const call = myPeer.call(userId, stream);
      const video = document.createElement("video");
      call.on("stream", (remoteStream) => {
        addVideoStream(video, remoteStream);
      });
      call.on("close", () => {
        video.remove();
      });

      peers[userId] = call;
    }

    function addVideoStream(video, stream) {
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
      videoGrid.append(video);
    }
    return () => {
      socket.disconnect();
      myVideoStream.getTracks().forEach((track) => {
        track.stop();
      });
      for (var key in peers) {
        peers[key].close();
      }
    };
  }, []);

  return <div id="video-grid" className={styles.videoCallGrid}></div>;
};

export default VideoCall;
