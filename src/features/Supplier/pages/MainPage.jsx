import Loading from "components/Loading";
import TableFooter from "components/TableFooter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  showToastError,
  showToastSuccess,
} from "utils/common";
import brandLogo from "../../../assets/images/brandLogo.png";
import {
  createSupplier,
  deleteSupplier,
  fetchSuppliers,
  updateSupplier,
} from "../supplierSlice";
import "./mainpage.scss";

function MainPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSuppliers());
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

  const supplierState = useSelector((state) => state.supplier);

  const { loading, supplier: suppliers } = supplierState;
  const [selectedSupplier, setSelectedSupplier] = useState();

  const [addModal, setAddModal] = useState(false);
  const toggleAddModal = () => setAddModal(!addModal);

  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  // handle add update supplier

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState(true);

  useEffect(() => {
    if (selectedSupplier) {
      setName(selectedSupplier.name);
      setEmail(selectedSupplier.email);
      setPhone(selectedSupplier.phone);
      setAddress(selectedSupplier.address);
      setState(selectedSupplier.state);
    }
  }, [selectedSupplier]);

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      if (!selectedSupplier) {
        await showToastSuccess(
          dispatch(
            createSupplier({
              name,
              email,
              phone,
              address,
              state,
            })
          )
        );
      } else {
        await showToastSuccess(
          dispatch(
            updateSupplier({
              _id: selectedSupplier._id,
              name,
              email,
              phone,
              address,
              state,
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

  const handleDeleteSupplier = async () => {
    try {
      await showToastSuccess(dispatch(deleteSupplier(selectedSupplier._id)));
      toggleDeleteModal();
    } catch (error) {
      showToastError(error);
    }
  };

  return suppliers.length === 0 && loading ? (
    <Loading />
  ) : (
    <div className="MainPage">
      <div className="MainPage__TableHeader">
        <div className="MainPage__add">
          <i
            onClick={() => {
              setName("");
              setEmail("");
              setPhone("");
              setAddress("");
              setState(false);
              setSelectedSupplier(undefined);
              toggleAddModal();
            }}
            className="zmdi zmdi-plus-circle"
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr>
            <th className="ps-3 fw-bold">#</th>
            <th>Supplier Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>State</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.slice(start, end).map((supplier, i) => (
            <tr
              key={supplier._id}
              style={{ verticalAlign: "middle", fontSize: "14px" }}
            >
              <th>
                <span className="ps-1">{i + 1}</span>
              </th>
              <th className="fw-normal">
                <code className="bg-dark text-white fw-bold ms-3 px-2 py-1 rounded-2">
                  {capitalizeFirstLetter(supplier.name)}
                </code>
              </th>
              <td>
                <code
                  className="text-white fw-bold ms-3 px-2 py-1 rounded-2"
                  style={{ backgroundColor: "deeppink" }}
                >
                  {supplier.email}
                </code>
              </td>
              <td>
                <code
                  className="ms-1 text-white fw-bold ms-3 px-2 py-1 rounded-2"
                  style={{ backgroundColor: "cyan" }}
                >
                  {capitalizeFirstLetter(supplier.phone)}
                </code>
              </td>
              <td style={{ width: "380px" }}>
                <p className="my-0 py-0">
                  <code className="text-secondary">{supplier.address}</code>
                </p>
              </td>
              <td>
                <code
                  className={
                    !supplier.state
                      ? "bg-danger text-white fw-bold ms-3 px-2 py-1 rounded-2"
                      : "bg-success text-white fw-bold ms-3 px-2 py-1 rounded-2"
                  }
                >
                  {!supplier.state ? "Stop Cooperating" : "Cooperating"}
                </code>
              </td>
              <td width={100}>
                <i
                  onClick={() => {
                    setSelectedSupplier(supplier);
                    toggleAddModal();
                  }}
                  className="zmdi zmdi-edit text-primary ps-3"
                />
                <i
                  onClick={() => {
                    setSelectedSupplier(supplier);
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
        totalRow={suppliers.length}
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
                  <Label for="name">Supplier Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className="mt-2">
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <Row className="mt-2">
              <Col md={12}>
                <FormGroup>
                  <Label for="address">Address</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className="mt-3 mb-3">
              <Input
                id="state"
                name="state"
                defaultChecked={selectedSupplier?.state}
                onChange={(e) => setState(e.target.checked)}
                type="checkbox"
              />

              <Label for="state" className="ms-1">
                Cooperate
              </Label>
            </FormGroup>
            <ModalFooter className="pb-0">
              <Button
                color="primary"
                disabled={loading}
                size="sm"
                type="submit"
              >
                {!!selectedSupplier ? "Update" : "Add"} Supplier
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
            {selectedSupplier?.name}
          </code>
          supplier?
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={loading}
            color="primary"
            size="sm"
            onClick={handleDeleteSupplier}
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
    </div>
  );
}

export default MainPage;
