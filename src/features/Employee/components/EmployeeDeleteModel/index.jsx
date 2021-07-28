import PropTypes from "prop-types";
import React from "react";
import { Badge, Button } from "reactstrap";
import FormHeader from "../../../../components/FormHeader";
import "./employeedeletemodel.scss";

EmployeeDeleteModel.propTypes = {
  closeModel: PropTypes.func,
  data: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func,
};

EmployeeDeleteModel.defaultProps = {
  closeModel: null,
  onDeleteClick: null,
};

function EmployeeDeleteModel(props) {
  const { closeModel, data, onDeleteClick } = props;

  const handleCloseModelClick = () => {
    if (!closeModel) return;
    closeModel();
  };

  const handleDeleteClick = async (employeeId) => {
    if (!onDeleteClick) return;
    await onDeleteClick(employeeId);
    closeModel();
  };

  return (
    <div className="EmployeeDeleteModel">
      <div className="EmployeeDeleteModel__main">
        <FormHeader closeModel={handleCloseModelClick} />
        <h6>
          {`Are you sure you want delete `}
          <Badge className="bg-danger">{`${data.firstname} ${data.lastname}`}</Badge>
          {` employee ?`}
        </h6>
        <div className="EmployeeDeleteModel__actions">
          <Button
            onClick={handleCloseModelClick}
            color="secondary"
            className="text-light"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteClick(data._id)}
            color="primary"
            className="ms-2 text-light"
          >
            Confirm
          </Button>{" "}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDeleteModel;
