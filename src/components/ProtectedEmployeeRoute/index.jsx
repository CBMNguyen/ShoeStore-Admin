import { PRODUCT_TOAST_OPTIONS } from "constants/globals";
import { EMPLOYEE_ROLE } from "constants/roles";
import { logout } from "features/Employee/employeeSlice";
import jwt from "jsonwebtoken";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Redirect, Route, useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";

function ProtectedEmployeeRoute(props) {
  const { auth, employee } = useSelector((state) => state.employee);
  const { component: Component, ...rest } = props;
  const match = useRouteMatch();
  const dispatch = useDispatch();

  return (
    <Route
      {...rest}
      render={(props) => {
        try {
          jwt.verify(auth.token, process.env.REACT_APP_JWT_KEY);
          const currentEmployee = employee.find(
            (item) => item._id === auth.data.employeeId
          );
          if (currentEmployee?.state) {
            toast("Your account has been locked.", {
              ...PRODUCT_TOAST_OPTIONS,
            });
            dispatch(logout());
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            );
          }

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
