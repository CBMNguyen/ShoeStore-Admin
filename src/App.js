import Header from "components/Header";
import IconControl from "components/IconControl";
import Loading from "components/Loading";
import NotFound from "components/NotFound";
import ProtectedOrderRoute from "components/ProtectedOrderRoute";
import ProtectedProductRoute from "components/ProtectedProductRoute";
import ProtectedEmployeeRoute from "components/ProtectedEmployeeRoute";
import ProtectedRoute from "components/ProtectedRoute";
import SideBar from "components/SideBar";
import Login from "features/Employee/components/Login";
import React, { Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import ProtectedReviewRoute from "components/ProtectedReviewRoute";
import ProtectedImportRoute from "components/ProtectedImportRoute";
import ProtectedDashboardRoute from "components/ProtectedDashboardRoute";

function App() {
  const Product = React.lazy(() => import("./features/product"));
  const Scc = React.lazy(() => import("./features/Scc"));
  const User = React.lazy(() => import("./features/User"));
  const Employee = React.lazy(() => import("./features/Employee"));
  const Order = React.lazy(() => import("./features/Order"));
  const DashBoard = React.lazy(() => import("./features/DashBoard"));
  const Role = React.lazy(() => import("./features/Role"));
  const Review = React.lazy(() => import("./features/Review"));
  const Discount = React.lazy(() => import("./features/Discount"));
  const Supplier = React.lazy(() => import("./features/Supplier"));
  const ImportOrder = React.lazy(() => import("./features/ImportOrder"));

  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <div className="App">
          <IconControl />
          <SideBar />
          <div className="main">
            <Header />
            <Switch>
              <Redirect exact from="/" to="/dashboard" />
              <ProtectedDashboardRoute
                path="/dashboard"
                component={DashBoard}
              />
              <ProtectedProductRoute path="/products" component={Product} />
              <ProtectedRoute path="/scc" component={Scc} />
              <ProtectedRoute path="/supplier" component={Supplier} />
              <ProtectedRoute path="/role" component={Role} />
              <ProtectedRoute path="/discount" component={Discount} />
              <ProtectedReviewRoute path="/review" component={Review} />
              <ProtectedEmployeeRoute path="/employee" component={Employee} />
              <ProtectedRoute path="/user" component={User} />
              <ProtectedOrderRoute path="/order" component={Order} />
              <ProtectedImportRoute
                path="/importOrder"
                component={ImportOrder}
              />
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
