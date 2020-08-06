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

const App = () => {
  const [headerTitle, setHeaderTitle] = useState("Secrets");

  const titleContext = { headerTitle, setHeaderTitle };

  return (
    <TitleContext.Provider value={titleContext}>
      <div style={{ height: "100vh" }} className="App">
        <Grid
          container
          style={{ height: "100%" }}
          direction="column"
          justify="flex-start"
          align-items="center"
        >
          <div className="app-header">
            <AppHeader />
          </div>
          <div className="app-body" style={{ flex: "1 1 auto" }}>
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
        </Grid>
      </div>
    </TitleContext.Provider>
  );
};

export default App;
