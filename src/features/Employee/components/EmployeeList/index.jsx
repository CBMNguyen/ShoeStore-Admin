import PropTypes from "prop-types";
import React from "react";
import { Table } from "reactstrap";
import EmployeeItem from "../EmployeeItem";

EmployeeList.propTypes = {
  employees: PropTypes.array,
  showEditModel: PropTypes.func.isRequired,
  showRemoveModel: PropTypes.func.isRequired,
  showViewModel: PropTypes.func.isRequired,
};

EmployeeList.defaultProps = {
  employees: [],
};

function EmployeeList(props) {
  const { employees, showEditModel, showRemoveModel, showViewModel } = props;
  return (
    <Table hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Age</th>
          <th>Position</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <EmployeeItem
            key={employee._id}
            showEditModel={showEditModel}
            showRemoveModel={showRemoveModel}
            showViewModel={showViewModel}
            employee={employee}
            index={index}
          />
        ))}
      </tbody>
    </Table>
  );
}

export default EmployeeList;
