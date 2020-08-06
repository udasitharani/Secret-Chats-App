import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core";
import AppHeader from "./Components/AppBar/AppBar";
import "./App.css";
import Home from "./Components/Home/Home";
import CreateRoom from "./Components/CreateRoom/CreateRoom";
import JoinRoom from "./Components/JoinRoom/JoinRoom";
import ChatRoom from "./Components/ChatRoom/ChatRoom";

const App = () => {
  const [headerTitle, setHeaderTitle] = useState("Secrets");
  return (
    <div style={{ height: "100vh" }} className="App">
      <Grid
        container
        style={{ height: "100%" }}
        direction="column"
        justify="flex-start"
        align-items="center"
      >
        <Switch>
          <Route path="/chat-room" component={ChatRoom} />

          <div className="app-header">
            <AppHeader title={headerTitle}></AppHeader>
          </div>
          <div className="app-body" style={{ flex: "1 1 auto" }}>
            <Route path="/" component={Home} exact />
            <Route path="/create-room">
              <CreateRoom setHeaderTitle={setHeaderTitle} />
            </Route>
            <Route path="/join-room">
              <JoinRoom setHeaderTitle={setHeaderTitle} />
            </Route>
          </div>
        </Switch>
      </Grid>
    </div>
  );
};

export default App;
