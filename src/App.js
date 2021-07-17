import Header from "components/Header";
import SideBar from "components/SideBar";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <SideBar />
        <div className="main">
          <Switch>
            <Route />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
