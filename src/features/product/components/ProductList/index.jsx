import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table,
} from "reactstrap";
import ProductItem from "../ProductItem";
import "./productlist.scss";
import brandLogo from "../../../../assets/images/brandLogo.png";

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
    loading,
    onToggleProductClick,
  } = props;

  const handlePriceChange = (price) => {
    if (!onPriceChange) return;
    onPriceChange(price);
  };

  const handleQuantityChange = (quantity) => {
    if (!onQuantityChange) return;
    onQuantityChange(quantity);
  };

  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

  const toggle = () => setModal(!modal);

  const handleToggleProductClick = async () => {
    if (!onToggleProductClick) return;
    await onToggleProductClick(selectedProduct);
    toggle();
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
          <th>State</th>

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
            toggle={toggle}
            setSelectedProduct={setSelectedProduct}
          />
        ))}
      </tbody>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <h4 className="ProductList__brand">
            Shoes Store <img src={brandLogo} alt="brandLogo" />
          </h4>
        </ModalHeader>
        <ModalBody>
          Are you sure you want to{" "}
          <code className="text-dark fw-bold">
            {selectedProduct?.state ? "Show " : "Hide "}
          </code>
          <Badge className="bg-danger">{`${selectedProduct?.name}`}</Badge>{" "}
          product?
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={loading}
            color="primary"
            size="sm"
            onClick={handleToggleProductClick}
          >
            Confirm {loading && <Spinner size="sm">{""}</Spinner>}
          </Button>{" "}
          <Button
            disabled={loading}
            color="secondary"
            size="sm"
            onClick={toggle}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Table>
  );
}

export default ProductList;
