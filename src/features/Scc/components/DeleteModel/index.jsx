import FormHeader from "components/FormHeader";
import PropTypes from "prop-types";
import React from "react";
import { Badge, Button } from "reactstrap";
import "./deletemodel.scss";

DeleteModel.propTypes = {
  closeModel: PropTypes.func,
  data: PropTypes.object.isRequired,
  onRemoveClick: PropTypes.func,
  name: PropTypes.string,
};

DeleteModel.defaultProps = {
  closeModel: null,
  onRemoveClick: null,
  name: "",
};

function DeleteModel(props) {
  const { closeModel, data, onRemoveClick, name } = props;

  const handleCloseModelClick = () => {
    if (!closeModel) return;
    closeModel();
  };

  const handleDeleteClick = async (Id) => {
    if (!onRemoveClick) return;
    await onRemoveClick(Id);
    closeModel();
  };

  return (
    <div className="DeleteModel">
      <div className="DeleteModel__main">
        <FormHeader closeModel={handleCloseModelClick} />
        <h6>
          {`Are you sure you want delete `}
          <Badge
            style={
              name === "color"
                ? { backgroundColor: data[name] }
                : { backgroundColor: "deeppink" }
            }
            className={data[name] === "white" ? "text-dark border" : ""}
          >
            {data[name]}
          </Badge>
          {` ${name === "name" ? "category" : name} ?`}
        </h6>
        <div className="DeleteModel__actions">
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

export default DeleteModel;
