import addressApi from "api/address";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { capitalizeFirstLetter, getAge } from "utils/common";

UserItem.propTypes = {
  index: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  showRemoveModel: PropTypes.func,
  setSelectedUser: PropTypes.func,
};

UserItem.defaultProps = {
  showRemoveModel: null,
  setSelectedUser: null,
};

function UserItem(props) {
  const { index, user, showRemoveModel, filter, setSelectedUser, toggle } =
    props;

  const [addresses, setAddresses] = useState([]);
  const [addressLoading, setAddressLoading] = useState(false);

  useEffect(() => {
    try {
      const fetchAddresses = async () => {
        setAddressLoading(true);
        const result = await addressApi.getByUserId(user._id);
        setAddressLoading(false);
        setAddresses(result.addresses);
      };
      fetchAddresses();
    } catch (error) {
      console.log(error);
      setAddressLoading(false);
    }
  }, [user._id]);

  const { page, limit } = filter;

  const birthDate = new Date(user.birthdate);

  const handleRemoveClick = (user) => {
    if (!showRemoveModel) return;
    showRemoveModel(user);
  };

  return (
    <tr style={{ verticalAlign: "middle", fontSize: "14px" }}>
      <th>{index + 1 + (page - 1) * limit}</th>
      <td>
        {user.image && (
          <img
            className="img-fluid rounded-circle shadow border-2"
            width={40}
            height={40}
            src={user.image}
            alt={user.image}
          />
        )}

        {!user.image && (
          <div
            style={{ width: "40px", height: "40px" }}
            className="d-flex align-items-center justify-content-center rounded-circle bg-dark text-white shadow border-2"
          >
            {user.firstname[0]}
          </div>
        )}
      </td>
      <td>
        <code className="bg-dark text-white fw-bold px-2 py-1 rounded-2">{`${user.firstname}  ${user.lastname}`}</code>
      </td>
      <td>
        <code
          style={{ backgroundColor: "cyan" }}
          className="text-white fw-bold px-2 py-1 rounded-2"
        >
          {capitalizeFirstLetter(user.gender)}
        </code>
      </td>
      <td>
        <code
          className="text-white fw-bold px-2 py-1 rounded-2"
          style={{ backgroundColor: "deeppink" }}
        >
          {user.email}
        </code>
      </td>
      <td style={{ width: "340px" }}>
        <Input type="select" name="address">
          {addresses.length === 0 && !addressLoading && (
            <option>No shipping address yet</option>
          )}
          {addresses.map((address) => (
            <option>{address.address.split("#")[0]}</option>
          ))}
        </Input>
      </td>
      <td>
        <code className="text-white fw-bold px-2 py-1 rounded-2 bg-secondary">
          {user.phone}
        </code>
      </td>
      <td>
        <code className="bg-warning text-white fw-bold px-2 py-1 rounded-2">
          {getAge(birthDate)}
        </code>
      </td>
      <td>
        <span className="p1-2">
          <code
            className={
              user.state
                ? "bg-danger text-white fw-bold px-2 py-1 rounded-2"
                : "bg-success text-white fw-bold px-2 py-1 rounded-2"
            }
          >
            {user.state ? "Locked" : "Active"}
          </code>
        </span>
      </td>
      <td>
        {" "}
        <i
          onClick={() => {
            toggle();
            setSelectedUser(user);
          }}
          className={`zmdi zmdi-lock-${
            user.state ? "outline" : "open"
          } text-secondary`}
        />
        <i
          onClick={() => handleRemoveClick(user)}
          className="zmdi zmdi-delete text-danger ps-2"
        />
      </td>
    </tr>
  );
}

export default UserItem;
