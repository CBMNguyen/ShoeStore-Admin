import PropTypes from "prop-types";
import React from "react";
import { Badge, Button } from "reactstrap";
import FormHeader from "../../../../components/FormHeader";
import "./userdeletemodel.scss";

UserDeleteModel.propTypes = {
  closeModel: PropTypes.func,
  data: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func,
};

UserDeleteModel.defaultProps = {
  closeModel: null,
  onDeleteClick: null,
};

function UserDeleteModel(props) {
  const { closeModel, data, onDeleteClick } = props;

  const handleCloseModelClick = () => {
    if (!closeModel) return;
    closeModel();
  };

  const handleDeleteClick = (UserId) => {
    if (!onDeleteClick) return;
    onDeleteClick(UserId);
  };

  return (
    <div className="UserDeleteModel">
      <div className="UserDeleteModel__main">
        <FormHeader closeModel={handleCloseModelClick} />
        <h6>
          {`Are you sure you want delete `}
          <Badge className="bg-danger">{`${data.firstname} ${data.lastname}`}</Badge>
          {` user ?`}
        </h6>
        <div className="UserDeleteModel__actions">
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

export default UserDeleteModel;
