import PropTypes from "prop-types";
import React from "react";
import { Badge } from "reactstrap";
import {
  capitalizeFirstLetter,
  dataURLtoFile,
  getAge,
  toDataURL,
} from "utils/common";

EmployeeItem.propTypes = {
  showEditModel: PropTypes.func,
  showRemoveModel: PropTypes.func,
  showViewModel: PropTypes.func,
  index: PropTypes.number.isRequired,
  employee: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
};

EmployeeItem.defaultProps = {
  showEditModel: null,
  showRemoveModel: null,
  showViewModel: null,
};

function EmployeeItem(props) {
  const {
    showEditModel,
    showRemoveModel,
    showViewModel,
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

  const handleViewClick = (employee) => {
    if (!showViewModel) return;
    showViewModel(employee);
  };

  return (
    <tr>
      <th>{index + 1 + (page - 1) * limit}</th>
      <td>
        <Badge className="bg-dark">{`${employee.firstname}  ${employee.lastname}`}</Badge>
      </td>
      <td>
        <Badge style={{ backgroundColor: "deeppink" }}>{employee.email}</Badge>
      </td>
      <td>
        <Badge style={{ backgroundColor: "cyan" }}>{employee.phone}</Badge>
      </td>
      <td>
        <span className="ps-2">
          <Badge className="bg-success">{getAge(birthDate)}</Badge>
        </span>
      </td>
      <td>
        <Badge className="bg-warning">
          {capitalizeFirstLetter(employee.position["position"])}
        </Badge>
      </td>

      <td>
        {" "}
        <i
          onClick={() => handleViewClick(employee)}
          className="zmdi zmdi-eye text-primary"
        />
        <i
          onClick={() => handleEditClick(employee)}
          className="zmdi zmdi-edit text-success ps-3"
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
