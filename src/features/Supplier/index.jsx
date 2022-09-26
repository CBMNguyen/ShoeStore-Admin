import NotFound from "components/NotFound";
import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import MainPage from "./pages/MainPage";

function Supplier(props) {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.url} component={MainPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default Supplier;
