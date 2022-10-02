import TableFooter from "components/TableFooter";
import {
  ORDER_STATE,
  ORDER_STATE_OPTIONS,
  PRODUCT_TOAST_OPTIONS,
} from "constants/globals";
import OrderDetailModal from "features/Order/components/OrderDetail";
import OrderHeader from "features/Order/components/OrderHeader";
import OrderList from "features/Order/components/OrderList";
import {
  fetchOrder,
  updateOrder,
  updateStateOrder,
} from "features/Order/orderSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Badge,
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import { capitalizeFirstLetter, getColorByState } from "utils/common";
import brandLogo from "../../../../assets/images/brandLogo.png";
import deliveredLogo from "../../../../assets/images/delivery-logo.png";
import momoImage from "../../../../assets/images/MoMo_Logo.png";
import "./order.scss";

function MainPage(props) {
  const dispatch = useDispatch();

  const initialFilter = {
    name: "",
    state: "",
    page: 1,
    limit: 9,
  };

  const [filter, setFilter] = useState(initialFilter);

  // handle fetchOrder update order state

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  const [selectedOrder, setSelectedOrder] = useState();
  const [selectedStateOrder, setSelectedStateOrder] = useState();
  const { order, loading } = useSelector((state) => state.order);
  const { auth } = useSelector((state) => state.employee);
  const [closeAll, setCloseAll] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const toggleNested = () => {
    setNestedModal(!nestedModal);
  };

  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  const handleUpdateStateOrder = async () => {
    try {
      setNestedModal(true);
      if (selectedStateOrder !== ORDER_STATE.cancelled) {
        await dispatch(
          updateStateOrder({
            _id: selectedOrder._id,
            state: selectedStateOrder,
            employee: auth.data,
            payment: selectedOrder.payment
              ? true
              : selectedStateOrder === ORDER_STATE.delivered
              ? true
              : false,
            order: selectedOrder,
          })
        );
      } else {
        await dispatch(updateOrder(selectedOrder._id));
      }
      toggleAll();
      toast(`This order has been ${selectedStateOrder}`, {
        ...PRODUCT_TOAST_OPTIONS,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Filter order by user name and order state

  const filterOrder = order.filter((od) => {
    return (
      (od.user.firstname.toLowerCase().indexOf(filter["name"].toLowerCase()) !==
        -1 ||
        od.user.lastname.toLowerCase().indexOf(filter["name"].toLowerCase()) !==
          -1) &&
      od.state.indexOf(filter["state"]) !== -1
    );
  });

  const start = (filter["page"] - 1) * filter["limit"];
  const end = filter["page"] * filter["limit"];

  // handle Pagination and filter Change

  const handlePageChange = (page) => {
    setFilter({ ...filter, page });
  };

  const handleNameChange = (name) => {
    setFilter({ ...filter, page: 1, name });
  };

  const handleStateChange = (state) => {
    state = state === "All" ? "" : state;
    setFilter({ ...filter, page: 1, state });
  };

  const handleResetFilter = () => {
    setFilter(initialFilter);
  };

  return (
    <div className="Order shadow">
      <OrderHeader
        name="order"
        onResetFilter={handleResetFilter}
        options={ORDER_STATE_OPTIONS}
        onNameChange={handleNameChange}
        onOptionsChange={handleStateChange}
      />

      <OrderList
        order={filterOrder.slice(start, end)}
        setSelectedOrder={setSelectedOrder}
        toggle={toggle}
      />

      <TableFooter
        filter={filter}
        totalRow={filterOrder.length}
        onPageChange={handlePageChange}
      />

      <Modal isOpen={modal} toggle={toggle} fullscreen>
        <ModalHeader toggle={toggle} className="py-2">
          <div className="Order__logo">
            <h2>
              <Link to="/">
                Shoes Store{" "}
                <img className="img-fluid" src={brandLogo} alt="brandLogo" />
              </Link>
            </h2>
          </div>
        </ModalHeader>
        <ModalBody className="py-0">
          <OrderDetailModal
            onUpdateStateOrderClick={toggleNested}
            order={selectedOrder}
          />

          {/* Confirm update order state */}

          <Modal
            isOpen={nestedModal}
            toggle={toggleNested}
            onClosed={closeAll ? toggle : undefined}
          >
            <ModalHeader>
              <div className="Order__logo py-0">
                <h2>
                  <Link to="/">
                    Shoes Store{" "}
                    <img
                      className="img-fluid"
                      src={brandLogo}
                      alt="brandLogo"
                    />
                  </Link>
                </h2>
              </div>
            </ModalHeader>
            <ModalBody>
              <code className="text-secondary fs-6">
                Are you sure you want to update order status to
                <Badge className={getColorByState(selectedStateOrder)}>
                  {capitalizeFirstLetter(selectedStateOrder)}
                </Badge>
                ?
              </code>
            </ModalBody>
            <ModalFooter>
              <Button
                disabled={loading}
                color="primary"
                className="btn-sm"
                onClick={handleUpdateStateOrder}
              >
                Confirm
                {loading && (
                  <Spinner size="sm" className="ms-2">
                    Loading
                  </Spinner>
                )}
              </Button>{" "}
              <Button
                disabled={loading}
                color="secondary"
                className="btn-sm"
                onClick={toggleNested}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter className="py-2 d-block">
          <Row>
            <Col md={7}>
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center me-2">
                  <code className="text-secondary">Payment Method:</code>
                  {selectedOrder?.paymentMethod ? (
                    <img
                      src={momoImage}
                      className="ms-3 rounded"
                      width={28}
                      height={28}
                      alt="momoLogo"
                    />
                  ) : (
                    <img
                      src={deliveredLogo}
                      className="ms-2"
                      width={40}
                      height={28}
                      alt="deliveredLogo"
                    />
                  )}
                </div>
                <div className="d-flex align-items-center mx-2">
                  <code className="text-secondary">Payment Status:</code>
                  {selectedOrder?.payment ? (
                    <i className="zmdi zmdi-check text-success fs-3 ms-3"></i>
                  ) : (
                    <i className="zmdi zmdi-close text-danger text-danger fs-3 ms-3"></i>
                  )}
                </div>
                <div className="d-flex align-items-center mx-2">
                  <code className="text-secondary me-4">Delivery charges</code>{" "}
                  <code className="fw-bold">
                    ${selectedOrder?.transportFee.toFixed(2)}
                  </code>
                </div>
                <div className="d-flex align-items-center">
                  <code className="text-secondary mx-3">Discount</code>
                  <code className="fw-bold">${selectedOrder?.discount}</code>
                </div>
              </div>
            </Col>
            <Col md={5}>
              <div className="float-end">
                <Button
                  disabled={selectedOrder?.state !== ORDER_STATE.pending}
                  color="primary"
                  className="rounded-1 btn-sm shadow me-1"
                  onClick={() => {
                    toggleNested();
                    setSelectedStateOrder("confirmed");
                  }}
                >
                  <code className="text-white text-uppercase">
                    Confirm Order
                  </code>
                </Button>{" "}
                <Button
                  disabled={selectedOrder?.state !== ORDER_STATE.confirmed}
                  color="warning"
                  className="rounded-1 btn-sm shadow"
                  onClick={() => {
                    toggleNested();
                    setSelectedStateOrder("shipping");
                  }}
                >
                  <code className="text-white text-uppercase">
                    Confirm shipping
                  </code>
                </Button>{" "}
                <Button
                  disabled={selectedOrder?.state !== ORDER_STATE.shipping}
                  color="success"
                  className="rounded-1 btn-sm mx-1 shadow"
                  onClick={() => {
                    toggleNested();
                    setSelectedStateOrder("delivered");
                  }}
                >
                  <code className="text-white text-uppercase">
                    successful delivery
                  </code>
                </Button>{" "}
                <Button
                  disabled={
                    selectedOrder?.state === ORDER_STATE.pending ||
                    selectedOrder?.state === ORDER_STATE.delivered ||
                    selectedOrder?.state === ORDER_STATE.cancelled
                  }
                  color="danger"
                  className="rounded-1 btn-sm me-1 shadow"
                  style={{
                    backgroundImage:
                      "linear-gradient(136deg) ,rgb(242, 113, 33) 0%,rgb(233, 64, 87) 50%,rgb(138, 35, 135) 100%",
                  }}
                  onClick={() => {
                    toggleNested();
                    setSelectedStateOrder(ORDER_STATE.cancelled);
                  }}
                >
                  <code className="text-white text-uppercase">
                    Cancel Order
                  </code>
                </Button>{" "}
                <Button
                  color="dark"
                  className="rounded-1 btn-sm shadow"
                  onClick={toggle}
                >
                  <code className="text-white text-uppercase">Close</code>
                </Button>
              </div>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default withRouter(MainPage);
