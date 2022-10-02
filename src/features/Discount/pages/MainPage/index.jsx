import discountApi from "api/discount";
import Loading from "components/Loading";
import TableFooter from "components/TableFooter";
import { PRODUCT_TOAST_OPTIONS } from "constants/globals";
import {
  createDiscount,
  deleteDiscount,
  fetchDiscounts,
  updateDiscount,
} from "features/Discount/discountSlice";
import { fetchDiscountType } from "features/Scc/discountTypeSlice";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import {
  capitalizeFirstLetter,
  formatDate,
  showToastError,
  showToastSuccess,
} from "utils/common";
import brandLogo from "../../../../assets/images/brandLogo.png";
import giftImage from "../../../../assets/images/surprise.png";
import "./mainpage.scss";

function MainPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDiscounts());
    dispatch(fetchDiscountType());
  }, [dispatch]);

  const [filter, setFilter] = useState({
    page: 1,
    limit: 8,
  });

  const handlePageChange = (page) => {
    setFilter({ ...filter, page });
  };

  const start = (filter["page"] - 1) * filter["limit"];
  const end = filter["page"] * filter["limit"];

  const discountState = useSelector((state) => state.discount);
  const { discountType: discountTypes } = useSelector(
    (state) => state.discountType
  );

  const { loading, discount: discounts } = discountState;
  const [selectedDiscount, setSelectedDiscount] = useState();

  const [addModal, setAddModal] = useState(false);
  const toggleAddModal = () => setAddModal(!addModal);

  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const [selectedGiftDiscount, setSelectedGiftDiscount] = useState();
  const [selectedSendType, setSelectedSendType] = useState(0);
  const [sendGiftLoading, setSendGiftLoading] = useState(false);

  const [giftModal, setGiftModal] = useState(false);
  const toggleGiftModal = () => setGiftModal(!giftModal);

  useEffect(() => {
    setSelectedGiftDiscount(
      discounts.filter((discountItem) => {
        const startDate = new Date(discountItem.startDate);
        const endDate = new Date(discountItem.endDate);
        const today = new Date();
        return (
          startDate.getTime() < endDate.getTime() &&
          endDate.getTime() > today.getTime()
        );
      })?.[0]
    );
  }, [discounts]);

  // handle send discount code

  const handleSendDiscountCode = async () => {
    try {
      setSendGiftLoading(true);
      const data = await discountApi.sendMail({
        type: selectedSendType,
        discount: selectedGiftDiscount,
      });
      setSendGiftLoading(false);
      toast(data.message, { ...PRODUCT_TOAST_OPTIONS });
    } catch (error) {
      setSendGiftLoading(false);
      showToastError(error);
    }
  };

  // handle add update discount

  const getClassNameByDate = (startDate, endDate) => {
    const today = new Date();
    if (new Date(endDate).getTime() < today.getTime()) {
      return ["bg-danger", "Expired"];
    } else if (new Date(startDate).getTime() > today.getTime()) {
      return ["bg-warning", "Upcoming"];
    } else {
      return ["bg-success", "Active"];
    }
  };

  const [discountName, setDiscountName] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [value, setValue] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (selectedDiscount) {
      setDiscountName(selectedDiscount.discountName);
      setDiscountCode(selectedDiscount.discountCode);
      setDiscountType(selectedDiscount.discountType._id);
      setValue(selectedDiscount.value);
      setQuantity(selectedDiscount.quantity);
      setStartDate(new Date(selectedDiscount.startDate));
      setEndDate(new Date(selectedDiscount.endDate));
    }
  }, [selectedDiscount]);

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      if (new Date(startDate).getTime() >= new Date(endDate).getTime()) {
        toast("Start date must be less than end date", {
          ...PRODUCT_TOAST_OPTIONS,
        });
        return;
      }

      if (!selectedDiscount) {
        await showToastSuccess(
          dispatch(
            createDiscount({
              discountName,
              discountCode,
              discountType,
              value,
              quantity,
              startDate,
              endDate,
            })
          )
        );
      } else {
        await showToastSuccess(
          dispatch(
            updateDiscount({
              _id: selectedDiscount._id,
              discountName,
              discountCode,
              discountType: discountTypes.find(
                (item) => item._id === discountType
              ),
              value,
              quantity,
              startDate,
              endDate,
            })
          )
        );
      }
      toggleAddModal();
    } catch (error) {
      showToastError(error);
      console.log(error);
    }
  };

  const handleDeleteDiscount = async () => {
    try {
      await showToastSuccess(dispatch(deleteDiscount(selectedDiscount._id)));
      toggleDeleteModal();
    } catch (error) {
      showToastError(error);
    }
  };

  return discounts.length === 0 && loading ? (
    <Loading />
  ) : (
    <div className="MainPage">
      <div className="MainPage__TableHeader">
        <div className="MainPage__add d-flex align-items-center">
          <i
            onClick={() => {
              setDiscountName("");
              setDiscountCode("");
              setDiscountType("");
              setValue(0);
              setQuantity(1);
              setStartDate(new Date());
              setEndDate(new Date());
              setSelectedDiscount(undefined);
              toggleAddModal();
            }}
            className="zmdi zmdi-plus-circle"
          />

          <i
            className="position-relative"
            onClick={toggleGiftModal}
            style={{ top: "-8px" }}
          >
            <img
              src={giftImage}
              className="ms-2"
              alt="gift"
              width={32}
              height={32}
            />
          </i>
        </div>
      </div>

      <Table>
        <thead>
          <tr>
            <th className="ps-3 fw-bold">#</th>
            <th>Discount Name</th>
            <th>Discount Code</th>
            <th>Discount Type</th>
            <th>Value</th>
            <th>Quantity</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>State</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {discounts.slice(start, end).map((discount, i) => (
            <tr key={discount._id} style={{ fontSize: "14px" }}>
              <th>
                <span className="ps-1">{i + 1}</span>
              </th>
              <th className="fw-normal">
                <code
                  className="fw-bold text-white px-2 py-1 rounded-2"
                  style={{ backgroundColor: "cyan" }}
                >
                  {capitalizeFirstLetter(discount.discountName)}
                </code>
              </th>
              <td>
                <code
                  className="fw-bold text-white px-2 py-1 rounded-2"
                  style={{ backgroundColor: "deeppink" }}
                >
                  {discount.discountCode}
                </code>
              </td>
              <td>
                <code className="bg-dark fw-bold text-white px-2 py-1 rounded-2">
                  {capitalizeFirstLetter(
                    discount.discountType.discountTypeName
                  )}
                </code>
              </td>
              <td>
                <code className="bg-warning fw-bold text-white px-2 py-1 rounded-2 ms-1">
                  {discount.discountType.discountTypeName !==
                    "discount by percent" && "$"}
                  {discount.value}
                  {discount.discountType.discountTypeName ===
                    "discount by percent" && "%"}
                </code>
              </td>
              <td>
                <code className="bg-success ms-3 fw-bold text-white px-2 py-1 rounded-2">
                  {discount.quantity}
                </code>
              </td>
              <td>
                <code className="bg-secondary fw-bold text-white px-2 py-1 rounded-2">
                  {new Date(discount.startDate).toUTCString()}
                </code>
              </td>
              <td>
                <code className="bg-secondary fw-bold text-white px-2 py-1 rounded-2">
                  {new Date(discount.endDate).toUTCString()}
                </code>
              </td>
              <td>
                <code
                  className={
                    getClassNameByDate(
                      discount.startDate,
                      discount.endDate
                    )[0] + " fw-bold text-white px-2 py-1 rounded-2"
                  }
                >
                  {getClassNameByDate(discount.startDate, discount.endDate)[1]}
                </code>
              </td>
              <td width={100}>
                <i
                  onClick={() => {
                    setSelectedDiscount(discount);
                    toggleAddModal();
                  }}
                  className="zmdi zmdi-edit text-primary ps-3"
                />
                <i
                  onClick={() => {
                    setSelectedDiscount(discount);
                    toggleDeleteModal();
                  }}
                  className="zmdi zmdi-delete text-danger ps-3"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <TableFooter
        onPageChange={handlePageChange}
        filter={filter}
        totalRow={discounts.length}
      />

      {/* Add Update Discount Modal */}
      <Modal isOpen={addModal} toggle={toggleAddModal}>
        <ModalHeader toggle={toggleAddModal}>
          <h4 className="MainPage__modal-header">
            Shoes Store <img src={brandLogo} alt="brandLogo" />
          </h4>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleAddReview}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="discountName">Discount Name</Label>
                  <Input
                    id="discountName"
                    name="discountName"
                    value={discountName}
                    onChange={(e) => setDiscountName(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="discountCode">Discount Code</Label>
                  <Input
                    id="discountCode"
                    name="discountCode"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className="mt-2">
              <Label for="discountType">Discount Type</Label>
              <Input
                type="select"
                id="discountType"
                name="discountType"
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                required
              >
                {discountTypes.map((item, index) => (
                  <option value={item._id} key={item._id}>
                    {capitalizeFirstLetter(item.discountTypeName)}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <Row className="mt-2">
              <Col md={6}>
                <FormGroup>
                  <Label for="value">Value</Label>
                  <Input
                    id="value"
                    name="value"
                    type="number"
                    min={0}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    min={1}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md={6}>
                <FormGroup>
                  <Label for="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="datetime-local"
                    required
                    value={moment(startDate).format("YYYY-MM-DDTHH:mm")}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="datetime-local"
                    required
                    value={moment(endDate).format("YYYY-MM-DDTHH:mm")}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <ModalFooter className="pb-0">
              <Button
                color="primary"
                disabled={loading}
                size="sm"
                type="submit"
              >
                {!!selectedDiscount ? "Update" : "Add"} Discount
                {loading && (
                  <Spinner size="sm" className="ms-2">
                    {""}
                  </Spinner>
                )}
              </Button>{" "}
              <Button
                disabled={loading}
                color="secondary"
                size="sm"
                onClick={toggleAddModal}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>

      {/* Delete Discount modal */}
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>
          <h4 className="MainPage__modal-header">
            Shoes Store <img src={brandLogo} alt="brandLogo" />
          </h4>
        </ModalHeader>
        <ModalBody>
          Are you sure you want to{" "}
          <code className="text-dark fw-bold me-1">
            {selectedDiscount?.discountName}
          </code>
          discount?
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={loading}
            color="primary"
            size="sm"
            onClick={handleDeleteDiscount}
          >
            Confirm {loading && <Spinner size="sm">{""}</Spinner>}
          </Button>{" "}
          <Button
            disabled={loading}
            color="secondary"
            size="sm"
            onClick={toggleDeleteModal}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Send Gift to users */}

      <Modal size="lg" isOpen={giftModal} toggle={toggleGiftModal}>
        <ModalHeader toggle={toggleGiftModal}>
          <h4 className="MainPage__modal-header">
            Shoes Store <img src={brandLogo} alt="brandLogo" />
          </h4>
        </ModalHeader>
        <ModalBody>
          <div>
            <h2 className="text-center">
              <code className="text-dark text-uppercase fw-bold">
                Send discount code by customer group
              </code>
            </h2>
            <div className="text-center">
              <code className="text-secondary">
                Please double check the information before adding
              </code>
            </div>

            <Form className="mt-3">
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="discountCodeName">Discount code name</Label>
                    <Input
                      id="discountCodeName"
                      name="discountCodeName"
                      type="select"
                      disabled={!selectedGiftDiscount}
                      onChange={(e) =>
                        setSelectedGiftDiscount(
                          discounts.find(
                            (discount) => discount._id === e.target.value
                          )
                        )
                      }
                    >
                      {discounts
                        .filter((discountItem) => {
                          const startDate = new Date(discountItem.startDate);
                          const endDate = new Date(discountItem.endDate);
                          const today = new Date();
                          return (
                            startDate.getTime() < endDate.getTime() &&
                            endDate.getTime() > today.getTime()
                          );
                        })
                        .map((discount) => (
                          <option value={discount._id} key={discount._id}>
                            {discount.discountName}
                          </option>
                        ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="sendType">Send type</Label>
                    <Input
                      id="sendType"
                      name="sendType"
                      type="select"
                      disabled={!selectedGiftDiscount}
                      onChange={(e) =>
                        setSelectedSendType(Number(e.target.value))
                      }
                    >
                      <option value={0}>Send all customers</option>
                      <option value={1}>
                        To customers who have purchased before
                      </option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              {selectedGiftDiscount && (
                <h4
                  className="text-center py-1 mb-0"
                  style={{ backgroundColor: "deeppink" }}
                >
                  <code className="text-uppercase text-white">
                    Check discount code information
                  </code>
                </h4>
              )}

              {selectedGiftDiscount && (
                <Row
                  style={{ backgroundColor: "rgba(255, 20, 147, 0.2 )" }}
                  className="mx-0 py-2 pb-3 shadow"
                >
                  <Col md={6}>
                    <div>
                      <code className="text-secondary fw-bold">
                        Discount code id:
                      </code>{" "}
                      <code className="text-dark fw-bold">
                        {selectedGiftDiscount?._id}
                      </code>
                    </div>
                    <div>
                      <code className="text-secondary fw-bold">
                        Discount code:
                      </code>{" "}
                      <code className="text-dark fw-bold">
                        {selectedGiftDiscount?.discountCode}
                      </code>
                    </div>
                    <div>
                      <code className="text-secondary fw-bold">
                        Discount code type:{" "}
                      </code>
                      <code className="text-dark fw-bold">
                        {capitalizeFirstLetter(
                          selectedGiftDiscount?.discountType
                            ?.discountTypeName || ""
                        )}
                      </code>
                    </div>
                    <div>
                      <code className="text-secondary fw-bold">
                        Start Date:{" "}
                      </code>
                      <code className="text-dark fw-bold">
                        {formatDate(selectedGiftDiscount.startDate)}
                      </code>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div>
                      <code className="text-secondary fw-bold">
                        Discount code name:
                      </code>{" "}
                      <code className="text-dark fw-bold">
                        {selectedGiftDiscount?.discountName}
                      </code>
                    </div>
                    <div>
                      <code className="text-secondary fw-bold">
                        Discount code quantity:
                      </code>{" "}
                      <code className="text-dark fw-bold">
                        {selectedGiftDiscount?.quantity}
                      </code>
                    </div>
                    <div>
                      <code className="text-secondary fw-bold">
                        Discount code value:{" "}
                      </code>
                      <code className="text-dark fw-bold">
                        {selectedGiftDiscount?.discountType
                          ?.discountTypeName !== "discount by percent" && "$"}
                        {selectedGiftDiscount?.value}
                        {selectedGiftDiscount?.discountType
                          ?.discountTypeName === "discount by percent" && "%"}
                      </code>
                    </div>
                    <div>
                      <code className="text-secondary fw-bold">
                        Start Date:{" "}
                      </code>
                      <code className="text-dark fw-bold">
                        {formatDate(selectedGiftDiscount.endDate)}
                      </code>
                    </div>
                  </Col>
                </Row>
              )}

              <Button
                onClick={handleSendDiscountCode}
                disabled={!selectedGiftDiscount || sendGiftLoading}
                className="border-0 text-uppercase w-50 d-block mx-auto my-3 mt-4 shadow py-2"
                style={{ backgroundColor: "cyan" }}
              >
                Send Code
                {sendGiftLoading && (
                  <Spinner size="sm" className="ms-2">
                    {" "}
                  </Spinner>
                )}
              </Button>
            </Form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={sendGiftLoading}
            color="secondary"
            onClick={toggleGiftModal}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default MainPage;
