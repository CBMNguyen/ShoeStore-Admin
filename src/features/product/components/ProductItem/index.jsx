import PropTypes from "prop-types";
import { capitalizeFirstLetter } from "utils/common";

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  showDeleteModel: PropTypes.func.isRequired,
  showUpdateModel: PropTypes.func.isRequired,
  showViewModel: PropTypes.func.isRequired,
  page: PropTypes.number,
};

ProductItem.defaultProps = {
  showDeleteModel: null,
  showUpdateModel: null,
  showViewModel: null,
  page: 0,
};

function ProductItem(props) {
  const {
    index,
    product,
    showDeleteModel,
    showUpdateModel,
    showViewModel,
    page,
    toggle,
    setSelectedProduct,
  } = props;

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
    <tr style={{ fontSize: "15px", verticalAlign: "middle" }}>
      <td>
        <code className="bg-secondary px-2 py-1 text-white rounded-2 fw-bold">
          {index + 1 + (page - 1) * 8}
        </code>
      </td>
      <td>
        <code className="bg-dark px-2 py-1 text-white rounded-2 fw-bold">
          {product.name}
        </code>
      </td>
      <td>
        <div style={{ width: "58px", height: "58px", overflow: "hidden" }}>
          {product.productDetail[0].images[0] ? (
            <img
              width="100%"
              height="100%"
              style={{
                objectFit: "cover",
                position: "relative",
                top: "-16px",
              }}
              src={`${product.productDetail[0].images[0]}`}
              alt={product._id}
            />
          ) : (
            <></>
          )}
        </div>
      </td>
      <td>
        <code
          className="px-2 py-1 text-white rounded-2 fw-bold"
          style={{ backgroundColor: "deeppink" }}
        >
          {capitalizeFirstLetter(product.category.name)}
        </code>
      </td>
      <td>
        <code
          style={{ backgroundColor: "cyan" }}
          className="ms-3 px-2 py-1 text-white rounded-2 fw-bold"
        >
          {product.quantityStock}
        </code>
      </td>
      <td>
        <code className="bg-warning px-2 py-1 text-white rounded-2 fw-bold">
          ${product.salePrice}
        </code>
      </td>

      <td>
        <span
          onClick={() => {
            toggle();
            setSelectedProduct(product);
          }}
          className="p1-2"
          style={{ cursor: "pointer" }}
        >
          <code
            className={
              product.state
                ? "bg-danger px-2 py-1 text-white rounded-2 fw-bold"
                : "bg-success px-2 py-1 text-white rounded-2 fw-bold"
            }
          >
            {product.state ? "Hide" : "Show"}
          </code>
        </span>
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
