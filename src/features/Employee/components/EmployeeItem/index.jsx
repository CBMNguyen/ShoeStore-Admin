import PropTypes from "prop-types";
import {
  capitalizeFirstLetter,
  dataURLtoFile,
  getAge,
  toDataURL,
} from "utils/common";

EmployeeItem.propTypes = {
  showEditModel: PropTypes.func,
  showRemoveModel: PropTypes.func,
  setSelectedEmployee: PropTypes.func,
  toggle: PropTypes.func,
  index: PropTypes.number.isRequired,
  employee: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
};

EmployeeItem.defaultProps = {
  showEditModel: null,
  showRemoveModel: null,
  setSelectedEmployee: null,
  toggle: null,
};

function EmployeeItem(props) {
  const {
    showEditModel,
    showRemoveModel,
    setSelectedEmployee,
    toggle,
    index,
    employee,
    filter,
  } = props;

  const { page, limit } = filter;

  const birthDate = new Date(employee.birthdate);

  const handleEditClick = async (employee) => {
    const dataUrl = await toDataURL(employee.image);
    const fileImage = dataURLtoFile(dataUrl, employee.image);

    if (!showEditModel) return;
    showEditModel({ ...employee, image: fileImage });
  };

  const handleRemoveClick = (employee) => {
    if (!showRemoveModel) return;
    showRemoveModel(employee);
  };

  return (
    <tr style={{ verticalAlign: "middle", fontSize: "15px" }}>
      <th>{index + 1 + (page - 1) * limit}</th>
      <td>
        {employee.image && (
          <img
            className="rounded-circle shadow border-2"
            width={42}
            height={42}
            src={employee.image}
            alt={employee.image}
            style={{ objectFit: "cover" }}
          />
        )}

        {!employee.image && (
          <div
            style={{ width: "42px", height: "42px" }}
            className="d-flex align-items-center justify-content-center rounded-circle bg-dark text-white shadow border-2"
          >
            {employee.firstname[0]}
          </div>
        )}
      </td>
      <td>
        <code className="bg-dark text-white fw-bold px-2 py-1 rounded-2">{`${employee.firstname}  ${employee.lastname}`}</code>
      </td>
      <td>
        <code className="bg-secondary text-white fw-bold px-2 py-1 rounded-2">
          {capitalizeFirstLetter(employee.gender)}
        </code>
      </td>
      <td>
        <code className="bg-primary text-white fw-bold px-2 py-1 rounded-2">
          {employee.address}
        </code>
      </td>
      <td>
        <code
          className="text-white fw-bold px-2 py-1 rounded-2"
          style={{ backgroundColor: "deeppink" }}
        >
          {employee.email}
        </code>
      </td>
      <td>
        <code
          className="text-white fw-bold px-2 py-1 rounded-2"
          style={{ backgroundColor: "cyan" }}
        >
          {employee.phone}
        </code>
      </td>
      <td>
        <span className="ps-2">
          <code className="bg-success text-white fw-bold px-2 py-1 rounded-2">
            {getAge(birthDate)}
          </code>
        </span>
      </td>
      <td>
        <code className="bg-dark text-white fw-bold px-2 py-1 rounded-2">
          {capitalizeFirstLetter(employee.position["position"])}
        </code>
      </td>
      <td>
        <code className="bg-warning text-white fw-bold px-2 py-1 rounded-2">
          ${employee.position.salary}
        </code>
      </td>

      <td>
        <span className="p1-2">
          <code
            className={
              employee.state
                ? "bg-danger text-white fw-bold px-2 py-1 rounded-2"
                : "bg-success text-white fw-bold px-2 py-1 rounded-2"
            }
          >
            {employee.state ? "Locked" : "Active"}
          </code>
        </span>
      </td>

      <td>
        {!employee.isAdmin && (
          <i
            onClick={() => {
              toggle();
              setSelectedEmployee(employee);
            }}
            className={`zmdi zmdi-lock-${
              employee.state ? "outline" : "open"
            } text-secondary`}
          />
        )}
        {employee.isAdmin && (
          <i
            className="zmdi zmdi-lock-open text-secondary"
            style={{ cursor: "no-drop" }}
          />
        )}
        <i
          onClick={() => handleEditClick(employee)}
          className="zmdi zmdi-edit text-primary ps-3"
        />
        <i
          onClick={() => handleRemoveClick(employee)}
          className="zmdi zmdi-delete text-danger ps-3"
        />
      </td>
    </tr>
  );
}

export default EmployeeItem;
