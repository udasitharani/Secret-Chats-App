import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core";
import AppHeader from "./Components/AppBar/AppBar";
import "./App.css";
import Home from "./Components/Home/Home";
import CreateRoom from "./Components/CreateRoom/CreateRoom";
import JoinRoom from "./Components/JoinRoom/JoinRoom";
import ChatRoom from "./Components/ChatRoom/ChatRoom";
import TitleContext from "./contexts/TitleContext";
import RoomDataContext from "./contexts/RoomDataContext";
import SnackBarContext from "./contexts/SnackBarContext";

const App = () => {
  const [headerTitle, setHeaderTitle] = useState("Secrets");
  const [roomData, setRoomData] = useState({});
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [SnackBarSeverity, setSnackBarSeverity] = useState("success");
  const [SnackBarMessage, setSnackBarMessage] = useState("");
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

  return (
    <TitleContext.Provider value={titleContext}>
      <RoomDataContext.Provider value={roomDataContext}>
        <SnackBarContext.Provider value={snackBarContext}>
          <div className="App">
            <div className="AppWrapper">
              <div className="app-header">
                <AppHeader />
              </div>
              <div className="app-body" style={{ flex: "1", overflow: "auto" }}>
                <Switch>
                  <Route path="/" component={Home} exact />
                  <Route path="/create-room">
                    <CreateRoom />
                  </Route>
                  <Route path="/join-room">
                    <JoinRoom />
                  </Route>
                  <Route path="/chat-room" component={ChatRoom} />
                </Switch>
              </div>
            </div>
          </div>
        </SnackBarContext.Provider>
      </RoomDataContext.Provider>
    </TitleContext.Provider>
  );
};

export default App;
