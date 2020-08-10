import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import AppHeader from "./Components/AppBar/AppBar";
import "./App.css";
import Home from "./Components/Home/Home";
import CreateRoom from "./Components/CreateRoom/CreateRoom";
import JoinRoom from "./Components/JoinRoom/JoinRoom";
import ChatRoom from "./Components/ChatRoom/ChatRoom";
import TitleContext from "./contexts/TitleContext";
import RoomDataContext from "./contexts/RoomDataContext";
import SnackBarContext from "./contexts/SnackBarContext";
import VideoButtonContext from "./contexts/VideoButtonContext";

const App = () => {
  const [headerTitle, setHeaderTitle] = useState("Binod Texting");
  const [roomData, setRoomData] = useState({});
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [SnackBarSeverity, setSnackBarSeverity] = useState("success");
  const [SnackBarMessage, setSnackBarMessage] = useState("");
  const [showVideoButton, setShowVideoButton] = useState(false);
  const [onVideoButtonClick, setOnVideoButtonClick] = useState();
  const titleContext = { headerTitle, setHeaderTitle };
  const roomDataContext = { roomData, setRoomData };
  const snackBarContext = {
    showSnackBar,
    setShowSnackBar,
    SnackBarSeverity,
    setSnackBarSeverity,
    SnackBarMessage,
    setSnackBarMessage,
  };
  const videoButtonContext = {
    showVideoButton,
    setShowVideoButton,
    onVideoButtonClick,
    setOnVideoButtonClick,
  };

  return (
    <TitleContext.Provider value={titleContext}>
      <RoomDataContext.Provider value={roomDataContext}>
        <SnackBarContext.Provider value={snackBarContext}>
          <VideoButtonContext.Provider value={videoButtonContext}>
            <div className="App">
              <div className="AppWrapper">
                <div className="app-header">
                  <AppHeader />
                </div>
                <div
                  className="app-body"
                  style={{ flex: "1", overflow: "auto" }}
                >
                  <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/create-room" component={CreateRoom} />
                    <Route path="/join-room" component={JoinRoom} />
                    <Route path="/chat-room" component={ChatRoom} />
                  </Switch>
                </div>
              </div>
            </div>
          </VideoButtonContext.Provider>
        </SnackBarContext.Provider>
      </RoomDataContext.Provider>
    </TitleContext.Provider>
  );
};

export default App;
