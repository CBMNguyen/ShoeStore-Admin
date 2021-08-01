import Header from "components/Header";
import IconControl from "components/IconControl";
import NotFound from "components/NotFound";
import SideBar from "components/SideBar";
import Login from "features/Employee/components/Login";
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import jwt from "jsonwebtoken";
import { Suspense } from "react";
import Loading from "components/Loading";

function App() {
  const { token } = useSelector((state) => state.employee.auth);
  let isExpire = false;
  try {
    jwt.verify(token, process.env.REACT_APP_JWT_KEY);
  } catch (error) {
    isExpire = true;
  }
  const Product = React.lazy(() => import("./features/product"));
  const Scc = React.lazy(() => import("./features/Scc"));
  const User = React.lazy(() => import("./features/User"));
  const Employee = React.lazy(() => import("./features/Employee"));
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        {isExpire && <Login />}

        {!isExpire && (
          <div className="App">
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
          </div>
        )}
        <ToastContainer />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
