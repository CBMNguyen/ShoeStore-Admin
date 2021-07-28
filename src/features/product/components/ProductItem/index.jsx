import PropTypes from "prop-types";
import React from "react";
import { Badge } from "reactstrap";
import { capitalizeFirstLetter } from "utils/common";

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  showDeleteModel: PropTypes.func.isRequired,
  showUpdateModel: PropTypes.func.isRequired,
  showViewModel: PropTypes.func.isRequired,
};

ProductItem.defaultProps = {
  showDeleteModel: null,
  showUpdateModel: null,
  showViewModel: null,
};

function ProductItem(props) {
  const { index, product, showDeleteModel, showUpdateModel, showViewModel } =
    props;

  const handleShowDeleteModel = (product) => {
    if (!showDeleteModel) return;
    showDeleteModel(product);
  };

  const handleShowUpdateModel = (product) => {
    if (!showUpdateModel) return;
    showUpdateModel(product);
  };

  const handleShowViewModel = (product) => {
    if (!showViewModel) return;
    showViewModel(product);
  };

  return (
    <tr>
      <td style={{ verticalAlign: "middle" }}>
        <Badge className="bg-secondary">{index}</Badge>
      </td>
      <td>
        <Badge className="bg-dark">{product.name}</Badge>
      </td>
      <td>
        <img
          width={56}
          height={56}
          src={`${process.env.REACT_APP_API_URL}/${product.images[0]}`}
          alt={product._id}
        />
      </td>
      <td>
        <Badge style={{ backgroundColor: "cyan" }}>
          {capitalizeFirstLetter(product.category.name)}
        </Badge>
      </td>
      <td className="ps-4">
        <Badge style={{ backgroundColor: "deeppink" }}>
          {product.quantityStock}
        </Badge>
      </td>
      <td>
        <Badge className="bg-warning">{product.originalPrice}$</Badge>
      </td>
      <td>
        <i
          onClick={() => handleShowViewModel(product)}
          className="zmdi zmdi-eye text-primary"
        />
        <i
          onClick={() => handleShowUpdateModel(product)}
          className="zmdi zmdi-edit text-success ps-3"
        />
        <i
          onClick={() => handleShowDeleteModel(product)}
          className="zmdi zmdi-delete text-danger ps-3"
        />
      </td>
    </tr>
  );
}

export default ProductItem;
