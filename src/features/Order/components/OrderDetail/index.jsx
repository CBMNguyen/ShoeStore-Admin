import React from "react";
import PropTypes from "prop-types";
import { STYLE_MODEL } from "constants/globals";
import { Button, Col, FormGroup, Label, Row, Table } from "reactstrap";
import { Input } from "reactstrap";
import "./orderdetail.scss";
import FormHeader from "components/FormHeader";
import { useDispatch } from "react-redux";
import { updateOrder } from "features/Order/orderSlice";
import { showToastError, showToastSuccess } from "utils/common";

OrderDetail.propTypes = {
  order: PropTypes.object.isRequired,
  closeModel: PropTypes.func.isRequired,
};

function OrderDetail(props) {
  const dispatch = useDispatch();
  const { order, closeModel } = props;

  const handleConformClick = async (orderId) => {
    try {
      await showToastSuccess(
        dispatch(updateOrder({ _id: orderId, state: "processing" }))
      );
      closeModel();
    } catch (error) {
      showToastError(error);
    }
  };

  const handleCompleteClick = async (orderId) => {
    try {
      await showToastSuccess(
        dispatch(updateOrder({ _id: orderId, state: "deliveried" }))
      );
      closeModel();
    } catch (error) {
      showToastError(error);
    }
  };

  return (
    <div style={STYLE_MODEL}>
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
                top: "-30px",
              }}
            >
              <Input
                defaultChecked={order.user.orderAddress.isFullDay}
                type="checkbox"
              />
              <Label className="ms-2">Delivery every day of the week</Label>
            </FormGroup>
          </Col>
          <Col md={12}>
            <Table
              style={{
                position: "relative",
                top: "-30px",
              }}
            >
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Color</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.selectedColor}</td>
                    <td>
                      <div className="ms-4">{product.selectedQuantity}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <div className="OrderDetail__btn">
          <Button
            className="text-light me-2"
            onClick={() => handleConformClick(order._id)}
            disabled={order.state !== "pending"}
          >
            Comfirm
          </Button>
          <Button
            onClick={() => handleCompleteClick(order._id)}
            disabled={order.state !== "processing"}
          >
            Complete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
