import React from "react";
import PropTypes from "prop-types";
import { STYLE_MODEL } from "constants/globals";
import { Button, Col, FormGroup, Label, Row, Spinner, Table } from "reactstrap";
import { Input } from "reactstrap";
import "./orderdetail.scss";
import FormHeader from "components/FormHeader";
import { useDispatch } from "react-redux";
import { updateOrder } from "features/Order/orderSlice";
import { getTotal, showToastError, showToastSuccess } from "utils/common";
import momoImage from "../../../../assets/images/MoMo_Logo.png";

OrderDetail.propTypes = {
  order: PropTypes.object.isRequired,
  closeModel: PropTypes.func.isRequired,
};

function OrderDetail(props) {
  const dispatch = useDispatch();
  const { order, loading, closeModel } = props;

  const handleConformClick = async (orderId, payment) => {
    try {
      await showToastSuccess(
        dispatch(updateOrder({ _id: orderId, state: "processing", payment }))
      );
      closeModel();
    } catch (error) {
      showToastError(error);
    }
  };

  const handleCompleteClick = async (orderId) => {
    try {
      await showToastSuccess(
        dispatch(
          updateOrder({ _id: orderId, state: "delivered", payment: true })
        )
      );
      closeModel();
    } catch (error) {
      showToastError(error);
    }
  };

  return (
    <div style={STYLE_MODEL} className="animation-fade-in">
      <div className="OrderDetail">
        <FormHeader closeModel={closeModel} />

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Receiver</Label>
              <Input defaultValue={order.user.orderAddress.fullName} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Phone</Label>
              <Input defaultValue={order.user.orderAddress.phone} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>City</Label>
              <Input defaultValue={order.user.orderAddress.city} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>District</Label>
              <Input defaultValue={order.user.orderAddress.district} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Commune</Label>
              <Input defaultValue={order.user.orderAddress.commune} />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Description</Label>
              <Input
                defaultValue={order.user.orderAddress.description}
                type="textarea"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup
              style={{
                position: "relative",
                top: "-20px",
              }}
            >
              <Input
                defaultChecked={order.user.orderAddress.isFullDay}
                type="checkbox"
              />
              <Label className="ms-2 ">Delivery every day of the week</Label>
            </FormGroup>
          </Col>
          <Col md={12}>
            <div className="OrderDetail__table">
              <Table className="table table-hovered table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Product</th>
                    <th className="text-center">Size</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product, index) => (
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      <td
                        className="text-center"
                        style={{ overflow: "hidden" }}
                      >
                        {
                          <img
                            style={{
                              position: "relative",
                              top: "-12px",
                              width: "48px",
                              height: "48px",
                              objectFit: "cover",
                            }}
                            src={
                              product.productDetail.find(
                                ({ color }) =>
                                  color.color === product.selectedColor
                              ).images[0]
                            }
                            alt={`productimage${index}`}
                          />
                        }
                      </td>
                      <td>{product.name}</td>
                      <td className="text-center">{product.selectedSize}</td>
                      <td>
                        <div className="ms-4 text-center">
                          {product.selectedQuantity}
                        </div>
                      </td>
                      <td className="text-center">{`$${(
                        product.selectedQuantity *
                        product.salePrice *
                        ((100 - product.promotionPercent) / 100)
                      ).toFixed(2)}`}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center justify-content-between w-75">
            <h6>Total: ${getTotal(order)}</h6>
            <h6>Payment Method:</h6>
            {order.paymentMethod === "momo" ? (
              <img
                src={momoImage}
                className=" ms-4 rounded"
                width={28}
                height={28}
                alt="momoLogo"
              />
            ) : (
              <img
                src="https://freepikpsd.com/file/2019/11/delivery-logo-png-Images.png"
                className=" ms-2"
                width={40}
                height={28}
                alt="momoLogo"
              />
            )}
            <h6>Payment</h6>
            {order.payment ? (
              <i className="zmdi zmdi-check text-success ms-4"></i>
            ) : (
              <i className="zmdi zmdi-close text-danger ms-4"></i>
            )}
          </div>
          <div className="OrderDetail__btn">
            <Button
              className="text-light me-2"
              onClick={() => handleConformClick(order._id, order.payment)}
              disabled={order.state !== "pending"}
            >
              <div className="d-flex align-items-center">
                <span>Comfirm</span>
                {loading && order.state === "pending" && (
                  <div>
                    <Spinner className="spinner-border-sm ms-1"> </Spinner>
                  </div>
                )}
              </div>
            </Button>
            <Button
              onClick={() => handleCompleteClick(order._id)}
              disabled={order.state !== "processing"}
            >
              <div className="d-flex align-items-center">
                <span>Complete</span>
                {loading && order.state === "processing" && (
                  <div>
                    <Spinner className="spinner-border-sm ms-1"> </Spinner>
                  </div>
                )}
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
