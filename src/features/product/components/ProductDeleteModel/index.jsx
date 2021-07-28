import PropTypes from "prop-types";
import React from "react";
import { Badge, Button } from "reactstrap";
import FormHeader from "../../../../components/FormHeader";
import "./productdeletemodel.scss";

ProductDeleteModel.propTypes = {
  closeModel: PropTypes.func,
  data: PropTypes.object.isRequired,
  onDeleteProductClick: PropTypes.func,
};

ProductDeleteModel.defaultProps = {
  closeModel: null,
  onDeleteProductClick: null,
};

function ProductDeleteModel(props) {
  const { closeModel, data, onDeleteProductClick } = props;

  const handleCloseModelClick = () => {
    if (!closeModel) return;
    closeModel();
  };

  const handleDeleteClick = async (productId) => {
    if (!onDeleteProductClick) return;
    await onDeleteProductClick(productId);
    closeModel();
  };

  return (
    <div className="ProductDeleteModel">
      <div className="ProductDeleteModel__main">
        <FormHeader closeModel={handleCloseModelClick} />
        <h6>
          {`Are you sure you want delete `}
          <Badge className="bg-danger">{data.name}</Badge>
          {` product ?`}
        </h6>
        <div className="ProductDeleteModel__actions">
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

export default ProductDeleteModel;
