import { PRODUCT_TOAST_OPTIONS } from "constants/globals";
import { EMPLOYEE_ROLE } from "constants/roles";
import jwt from "jsonwebtoken";
import { useSelector } from "react-redux";
import { Redirect, Route, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";

function ProtectedEmployeeRoute(props) {
  const { auth } = useSelector((state) => state.employee);
  const { component: Component, ...rest } = props;
  const match = useRouteMatch();

  return (
    <Route
      {...rest}
      render={(props) => {
        try {
          jwt.verify(auth.token, process.env.REACT_APP_JWT_KEY);
          if (!(auth.data.roles.includes(EMPLOYEE_ROLE) || auth.data.isAdmin)) {
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

export default ProtectedEmployeeRoute;
