import Header from "components/Header";
import IconControl from "components/IconControl";
import NotFound from "components/NotFound";
import SideBar from "components/SideBar";
import Employee from "features/Employee";
import Product from "features/product";
import Scc from "features/Scc";
import User from "features/User";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <IconControl />
        <SideBar />
        <div className="main">
          <Header />
          <Switch>
            <Route path="/products" component={Product} />
            <Route path="/scc" component={Scc} />
            <Route path="/employee" component={Employee} />
            <Route path="/user" component={User} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
