import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import "./topproductseling.scss";
TopProductSeling.propTypes = {
  products: PropTypes.array.isRequired,
};

function TopProductSeling(props) {
  const { products } = props;
  return (
    <div className="TopProductSeling shadow">
      <header className="d-flex justify-content-between">
        <div>Top Seling Product</div>
        <div>
          <Link to="/products">See All</Link>
        </div>
      </header>

      <Table borderless>
        <tbody>
          {products
            .slice(0, 5)
            .sort((a, b) => a.salePrice - b.salePrice)
            .map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      style={{
                        objectFit: "cover",
                        position: "relative",
                        top: "-10px",
                      }}
                      className="rounded"
                      width={45}
                      height={45}
                      src={`${product.productDetail[0].images[0]}`}
                      alt={product._id}
                    />
                    <div className="ms-3">{product.name}</div>
                  </div>
                </td>

                <td>{product.originalPrice}$</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TopProductSeling;
