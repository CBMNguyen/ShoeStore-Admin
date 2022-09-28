import { PRODUCT_TOAST_OPTIONS } from "constants/globals";
import { ORDER_ROLE } from "constants/roles";
import jwt from "jsonwebtoken";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";

function ProtectedOrderRoute(props) {
  const { auth } = useSelector((state) => state.employee);
  const { component: Component, ...rest } = props;
  const match = useRouteMatch();

  return (
    <Route
      {...rest}
      render={(props) => {
        try {
          jwt.verify(auth.token, process.env.REACT_APP_JWT_KEY);
          if (!(auth.data.roles.includes(ORDER_ROLE) || auth.data.isAdmin)) {
            toast("You do not have permission to access this endpoint.", {
              ...PRODUCT_TOAST_OPTIONS,
            });
            return (
              <Redirect
                to={{ pathname: match.url, state: { from: props.location } }}
              />
            );
          }
          return <Component />;
        } catch (error) {
          toast("Please check login.", { ...PRODUCT_TOAST_OPTIONS });
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedOrderRoute;
