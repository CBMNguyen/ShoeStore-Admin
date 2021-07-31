import ActionsButton from "components/ActionsButton";
import FormHeader from "components/FormHeader";
import { STYLE_MODEL } from "constants/globals";
import PropTypes from "prop-types";
import React from "react";
import { Badge } from "reactstrap";
import "./deletemodel.scss";

DeleteModel.propTypes = {
  name: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  closeModel: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
};

DeleteModel.defaultProps = {
  name: "",
};

function DeleteModel(props) {
  const { closeModel, data, onRemoveClick, name, loading } = props;

  return (
    <div className="DeleteModel" style={STYLE_MODEL}>
      <div className="DeleteModel__main">
        <FormHeader closeModel={closeModel} />
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
        <ActionsButton
          loading={loading}
          data={data}
          onCloseModelClick={closeModel}
          onRemoveClick={onRemoveClick}
        />
      </div>
    </div>
  );
}

export default DeleteModel;
