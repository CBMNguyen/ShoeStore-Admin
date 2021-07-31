import ActionsButton from "components/ActionsButton";
import { STYLE_MODEL } from "constants/globals";
import PropTypes from "prop-types";
import React from "react";
import { Badge } from "reactstrap";
import FormHeader from "../../../../components/FormHeader";
import "./productdeletemodel.scss";

ProductDeleteModel.propTypes = {
  closeModel: PropTypes.func,
  data: PropTypes.object.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

function ProductDeleteModel(props) {
  const { closeModel, data, onRemoveClick, loading } = props;

  return (
    <div className="ProductDeleteModel" style={STYLE_MODEL}>
      <div className="ProductDeleteModel__main">
        <FormHeader closeModel={closeModel} />
        <h6>
          {`Are you sure you want delete `}
          <Badge className="bg-danger">{data.name}</Badge>
          {` product ?`}
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

export default ProductDeleteModel;
