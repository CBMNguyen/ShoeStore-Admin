import ActionsButton from "components/ActionsButton";
import { STYLE_MODEL } from "constants/globals";
import PropTypes from "prop-types";
import React from "react";
import { Badge } from "reactstrap";
import FormHeader from "../../../../components/FormHeader";
import "./userdeletemodel.scss";

UserDeleteModel.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  closeModel: PropTypes.func,
  onRemoveClick: PropTypes.func,
};

function UserDeleteModel(props) {
  const { closeModel, data, onRemoveClick, loading } = props;

  return (
    <div className="UserDeleteModel animation-fade-in" style={STYLE_MODEL}>
      <div className="UserDeleteModel__main">
        <FormHeader closeModel={closeModel} />
        <h6>
          {`Are you sure you want delete `}
          <Badge className="bg-danger">{`${data.firstname} ${data.lastname}`}</Badge>
          {` user ?`}
        </h6>
        <ActionsButton
          loading={loading}
          data={data}
          onRemoveClick={onRemoveClick}
          onCloseModelClick={closeModel}
        />
      </div>
    </div>
  );
}

export default UserDeleteModel;
