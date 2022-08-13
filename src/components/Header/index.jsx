import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import brandLogo from "../../assets/images/brandLogo.png";
import "./header.scss";

const Header = (props) => {
  const item = useSelector((state) => state.employee.auth);
  return (
    <div className="Header shadow rounded">
      <div className="Header__title">
        <Link to="/">
          <h2>
            Shoes Store <img src={brandLogo} alt="brandLogo" />
          </h2>{" "}
        </Link>
      </div>
      <div className="Header__admin">
        <div>
          <img
            className="rounded-circle me-2"
            width={38}
            height={38}
            src={item.data.imageUrl}
            alt="admin"
          />
        </div>
        <div>{`${item.data.firstname} ${item.data.lastname}`}</div>
      </div>
    </div>
  );
};

export default Header;
