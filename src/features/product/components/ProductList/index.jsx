import PropTypes from "prop-types";
import React from "react";
import { Table } from "reactstrap";
import ProductItem from "../ProductItem";
import "./productlist.scss";

ProductList.propTypes = {
  products: PropTypes.array,
  showDeleteModel: PropTypes.func,
  showUpdateModel: PropTypes.func,
  showViewModel: PropTypes.func,
};

ProductList.defaultProps = {
  products: [],
  showDeleteModel: null,
  showUpdateModel: null,
  showUpViewModel: null,
};

function ProductList(props) {
  const { products, showDeleteModel, showUpdateModel, showViewModel } = props;
  return (
    <Table size="sm" className="p-2">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Image</th>
          <th>Brand</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <ProductItem
            key={product._id}
            index={index}
            product={product}
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
