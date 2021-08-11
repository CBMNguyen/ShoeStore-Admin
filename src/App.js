import Header from "components/Header";
import IconControl from "components/IconControl";
import Loading from "components/Loading";
import NotFound from "components/NotFound";
import ProtectedRoute from "components/ProtectedRoute";
import SideBar from "components/SideBar";
import Login from "features/Employee/components/Login";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.scss";

function App() {
  const Product = React.lazy(() => import("./features/product"));
  const Scc = React.lazy(() => import("./features/Scc"));
  const User = React.lazy(() => import("./features/User"));
  const Employee = React.lazy(() => import("./features/Employee"));
  const Order = React.lazy(() => import("./features/Order"));

  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <div className="App">
          <IconControl />
          <SideBar />
          <div className="main">
            <Header />
            <Switch>
              <ProtectedRoute path="/products" component={Product} />
              <ProtectedRoute path="/scc" component={Scc} />
              <ProtectedRoute path="/employee" component={Employee} />
              <ProtectedRoute path="/user" component={User} />
              <ProtectedRoute path="/order" component={Order} />
              <Route path="/login" component={Login} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
        <ToastContainer />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
