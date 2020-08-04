import React from "react";
import { Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core";
import AppHeader from "./Components/AppBar";
import "./App.css";
import Home from "./Components/Home";

function App() {
  return (
    <div style={{ height: "100vh" }} className="App">
      <Grid
        container
        style={{ height: "100%" }}
        direction="column"
        justify="flex-start"
        align-items="center"
      >
        <div className="app-header" style={{ flex: "0 1 auto" }}>
          <AppHeader></AppHeader>
        </div>
        <div className="app-body" style={{ flex: "1 1 auto" }}>
          <Switch>
            <Route to="/" component={Home} exact />
          </Switch>
        </div>
      </Grid>
    </div>
  );
}

export default App;
