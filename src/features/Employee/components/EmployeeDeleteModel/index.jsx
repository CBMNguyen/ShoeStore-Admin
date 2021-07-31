import ActionsButton from "components/ActionsButton";
import { STYLE_MODEL } from "constants/globals";
import PropTypes from "prop-types";
import React from "react";
import { Badge } from "reactstrap";
import FormHeader from "../../../../components/FormHeader";
import "./employeedeletemodel.scss";

EmployeeDeleteModel.propTypes = {
  data: PropTypes.object.isRequired,
  closeModel: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

function EmployeeDeleteModel(props) {
  const { closeModel, data, onRemoveClick, loading } = props;
  return (
    <div className="EmployeeDeleteModel" style={STYLE_MODEL}>
      <div className="EmployeeDeleteModel__main">
        <FormHeader closeModel={closeModel} />
        <h6>
          {`Are you sure you want delete `}
          <Badge className="bg-danger">{`${data.firstname} ${data.lastname}`}</Badge>
          {` employee ?`}
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

export default EmployeeDeleteModel;
