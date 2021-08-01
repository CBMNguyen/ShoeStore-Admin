import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { Table } from "reactstrap";
import ProductItem from "../ProductItem";
import "./productlist.scss";

ProductList.propTypes = {
  products: PropTypes.array,
  filter: PropTypes.object.isRequired,
  showDeleteModel: PropTypes.func.isRequired,
  showUpdateModel: PropTypes.func.isRequired,
  showViewModel: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func,
  onPriceChange: PropTypes.func,
};

ProductList.defaultProps = {
  products: [],
  onPriceChange: null,
  onQuantityChange: null,
};

function ProductList(props) {
  const {
    products,
    filter,
    showDeleteModel,
    showUpdateModel,
    showViewModel,
    onPriceChange,
    onQuantityChange,
  } = props;

  const handlePriceChange = (price) => {
    if (!onPriceChange) return;
    onPriceChange(price);
  };

  const handleQuantityChange = (quantity) => {
    if (!onQuantityChange) return;
    onQuantityChange(quantity);
  };

  return (
    <Table className="ProductList" size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Image</th>
          <th>Brand</th>
          <th>
            Quantity
            <span>
              <i
                onClick={() => handleQuantityChange(1)}
                className={classNames(
                  "ProductList__increase  zmdi zmdi-caret-up",
                  { "ProductList__increase--active": filter["quantity"] === 1 }
                )}
              />
              <i
                onClick={() => handleQuantityChange(-1)}
                className={classNames(
                  "ProductList__decrease  zmdi zmdi-caret-down",
                  { "ProductList__decrease--active": filter["quantity"] === -1 }
                )}
              />
            </span>
          </th>
          <th>
            Price{" "}
            <span>
              <i
                onClick={() => handlePriceChange(1)}
                className={classNames(
                  "ProductList__increase  zmdi zmdi-caret-up",
                  { "ProductList__increase--active": filter["price"] === 1 }
                )}
              />
              <i
                onClick={() => handlePriceChange(-1)}
                className={classNames(
                  "ProductList__decrease  zmdi zmdi-caret-down",
                  { "ProductList__decrease--active": filter["price"] === -1 }
                )}
              />
            </span>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <ProductItem
            index={index}
            key={product._id}
            product={product}
            page={filter["page"]}
            showDeleteModel={showDeleteModel}
            showUpdateModel={showUpdateModel}
            showViewModel={showViewModel}
          />
        ))}
      </tbody>
    </Table>
  );
}

export default ProductList;
