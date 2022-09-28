import { logout } from "features/Employee/employeeSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import brandLogo from "../../assets/images/brandLogo.png";
import "./header.scss";

const Header = (props) => {
  const auth = useSelector((state) => state.employee?.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.replace("/login");
  };
  return (
    <div className="Header shadow rounded">
      <div className="Header__title">
        <Link to="/">
          <h2>
            Shoes Store <img src={brandLogo} alt="brandLogo" />
          </h2>{" "}
        </Link>
      </div>
      {auth?.token && (
        <div className="Header__admin">
          <div>
            <img
              className="rounded-circle me-2 shadow"
              width={40}
              height={40}
              src={auth.data.image}
              alt="admin"
              style={{ objectFit: "cover" }}
            />
          </div>
          <code className="text-dark fw-bold rounded-2 ">{`${auth.data.firstname} ${auth.data.lastname}`}</code>

          <Button
            onClick={handleLogout}
            color="info"
            size="sm"
            className="ms-3 "
          >
            <code
              className="text-white text-uppercase fw-bold"
              style={{ letterSpacing: "1px" }}
            >
              Logout
            </code>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
