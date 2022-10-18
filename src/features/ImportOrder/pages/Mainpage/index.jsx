import Loading from "components/Loading";
import TableFooter from "components/TableFooter";
import {
  createImportOrder,
  deleteImportOrder,
  fetchImportOrder,
  updateImportOrder,
} from "features/ImportOrder/importOrderSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  ModalFooter,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import { capitalizeFirstLetter, showToastSuccess } from "utils/common";
import "./mainpage.scss";

import { Modal, ModalBody, ModalHeader } from "reactstrap";
import brandLogo from "../../../../assets/images/brandLogo.png";
import { fetchProduct } from "features/product/productSlice";
import { fetchSuppliers } from "features/Supplier/supplierSlice";
import { toast } from "react-toastify";
import { PRODUCT_TOAST_OPTIONS } from "constants/globals";
import productApi from "api/product";

function MainPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchImportOrder());
    dispatch(fetchProduct());
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const { loading, importOrder: importOrders } = useSelector(
    (state) => state.importOrder
  );

  const { auth } = useSelector((state) => state.employee);

  const { products } = useSelector((state) => state.products);
  const { supplier: suppliers } = useSelector((state) => state.supplier);

  const [selectedImportOrder, setSelectedImportOrder] = useState();
  const [currentImportOrders, setCurrentImportOrders] = useState([]);
  const [supplier, setSupplier] = useState("");
  const [content, setContent] = useState("");

  const [searchName, setSearchName] = useState("");
  let filterProducts = products.filter(
    (product) =>
      (product.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1 ||
        product.category.name
          .toLowerCase()
          .indexOf(searchName.toLowerCase()) !== -1) &&
      !currentImportOrders.some(
        (productItem) => product._id === productItem._id
      )
  );

  if (!searchName) {
    filterProducts = [];
  }

  const [addModal, setAddModal] = useState(false);
  const toggleAddModal = () => setAddModal(!addModal);

  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  // handle add update import order
  const handleAddImportOrder = async () => {
    const importOrderPost = {
      employeeId: auth.data.employeeId,
      supplierId: supplier,
      content: content,
      products: currentImportOrders.map(
        ({ _id, productDetail, quantityStock, originalPrice }) => ({
          _id,
          productDetail,
          originalPrice,
          quantityStock,
        })
      ),
      totalAmount: currentImportOrders.reduce(
        (sum, importOrderItem) =>
          sum + importOrderItem.quantityStock * importOrderItem.originalPrice,
        0
      ),
      totalQuantity: currentImportOrders.reduce(
        (sum, importOrderItem) => sum + importOrderItem.quantityStock,
        0
      ),
    };

    try {
      if (!selectedImportOrder) {
        await showToastSuccess(dispatch(createImportOrder(importOrderPost)));
      } else {
        await showToastSuccess(
          dispatch(
            updateImportOrder({
              ...importOrderPost,
              employeeId: selectedImportOrder.employeeId,
              _id: selectedImportOrder._id,
              state: selectedImportOrder.state,
              createdAt: new Date(selectedImportOrder.createdAt),
              updatedAt: new Date(),
            })
          )
        );
      }
    } catch (error) {
      toast(error.message, { ...PRODUCT_TOAST_OPTIONS });
    }
    toggleAddModal();
  };

  // handle accept import order

  const handleAcceptImportOrder = async () => {
    try {
      const importOrderIndex = selectedImportOrder.products.map(
        (importProduct) =>
          products.findIndex((product) => product._id === importProduct._id)
      );
      const updateProducts = importOrderIndex
        .map((index) => products.slice()[index])
        .map(({ _id, quantityStock, productDetail }) => ({
          _id,
          quantityStock,
          productDetail,
        }));

      const updateProductPost = updateProducts.map(
        ({ _id, productDetail, quantityStock }, index) => {
          return {
            _id,
            originalPrice: selectedImportOrder.products[index].originalPrice,
            salePrice:
              parseFloat(selectedImportOrder.products[index].originalPrice) +
              parseFloat(selectedImportOrder.products[index].originalPrice) *
                0.1,
            quantityStock:
              quantityStock + selectedImportOrder.products[index].quantityStock,
            productDetail: productDetail.map(
              (productDetailItem, productDetailIndex) => ({
                ...productDetailItem,
                sizeAndQuantity: productDetailItem.sizeAndQuantity.map(
                  (sizeAndQuantityItem, sizeAndQuantityIndex) => ({
                    ...sizeAndQuantityItem,
                    quantity:
                      sizeAndQuantityItem.quantity +
                      selectedImportOrder.products[index].productDetail[
                        productDetailIndex
                      ].sizeAndQuantity[sizeAndQuantityIndex].quantity,
                  })
                ),
              })
            ),
          };
        }
      );

      await Promise.all(
        updateProductPost.map(({ _id, ...product }) =>
          productApi.updateQuantity(_id, product)
        )
      );

      await showToastSuccess(
        dispatch(
          updateImportOrder({
            ...selectedImportOrder,
            state: true,
            _id: selectedImportOrder._id,
          })
        )
      );
      toggleAddModal();
    } catch (error) {
      toast(error.message, { ...PRODUCT_TOAST_OPTIONS });
    }
  };

  const handleDeleteCurrentImportOrder = (product) => {
    setCurrentImportOrders(
      currentImportOrders.filter((item) => item._id !== product._id)
    );
  };

  const handleDeleteImportOrder = async () => {
    if (selectedImportOrder) {
      try {
        await showToastSuccess(
          dispatch(deleteImportOrder(selectedImportOrder._id))
        );
        toggleDeleteModal();
      } catch (error) {
        toast(error.message, { ...PRODUCT_TOAST_OPTIONS });
      }
    }
  };

  return importOrders.length === 0 && loading ? (
    <Loading />
  ) : (
    <div className="MainPage">
      <div className="MainPage__TableHeader">
        <div className="MainPage__add">
          <i
            onClick={() => {
              setContent("");
              setCurrentImportOrders([]);
              setSupplier(suppliers[0]._id);
              setSelectedImportOrder(null);
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
            <th>Import Staff</th>
            <th>Supplier</th>
            <th>Import Date</th>
            <th>Confirm Date</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>State</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {importOrders.map((importOrder, i) => (
            <tr key={importOrder._id} style={{ fontSize: "14px" }}>
              <th>
                <span className="ps-1">{i + 1}</span>
              </th>
              <th className="fw-normal">
                <code
                  style={{ backgroundColor: "cyan" }}
                  className="text-white fw-bold px-2 py-1 rounded-2"
                >
                  {capitalizeFirstLetter(importOrder.employeeId.firstname) +
                    " " +
                    capitalizeFirstLetter(importOrder.employeeId.lastname)}
                </code>
              </th>
              <td>
                <code
                  style={{ backgroundColor: "deeppink" }}
                  className="text-white fw-bold px-2 py-1 rounded-2"
                >
                  {importOrder.supplierId.name}
                </code>
              </td>
              <td>
                <code className="bg-secondary text-white fw-bold px-2 py-1 rounded-2">
                  {new Date(importOrder.createdAt).toUTCString()}
                </code>
              </td>
              <td>
                <code className="bg-secondary text-white fw-bold px-2 py-1 rounded-2">
                  {importOrder.state &&
                    new Date(importOrder.updatedAt).toUTCString()}
                  {!importOrder.state && "Awaiting Confirmation"}
                </code>
              </td>
              <td>
                <code className="bg-dark text-white fw-bold px-2 rounded-2 ms-4">
                  {importOrder.totalQuantity}
                </code>
              </td>
              <td>
                <code className="bg-warning text-white fw-bold px-2 py-1 rounded-2">
                  ${importOrder.totalAmount}
                </code>
              </td>
              <td>
                <code
                  className={
                    importOrder.state
                      ? "bg-success text-white fw-bold px-2 py-1 rounded-2"
                      : "bg-danger text-white fw-bold px-2 py-1 rounded-2"
                  }
                >
                  {importOrder.state && "Stocked"}
                  {!importOrder.state && "Unconfimred"}
                </code>
              </td>
              <td width={100}>
                <i
                  onClick={() => {
                    setContent(importOrder.content);
                    setCurrentImportOrders(importOrder.products);
                    setSupplier(importOrder.supplierId);
                    setSelectedImportOrder(importOrder);
                    toggleAddModal();
                  }}
                  className="zmdi zmdi-edit text-primary ps-3"
                />
                <i
                  style={{
                    display:
                      (!importOrder.state &&
                        auth.data.employeeId === importOrder.employeeId._id) ||
                      auth.data.isAdmin
                        ? "inline"
                        : "none",
                  }}
                  onClick={() => {
                    toggleDeleteModal();
                    setSelectedImportOrder(importOrder);
                  }}
                  className="zmdi zmdi-delete text-danger ps-3"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <TableFooter
        // onPageChange={handlePageChange}
        filter={{ page: 1, limit: 8 }}
        totalRow={importOrders.length}
      />

      {/* Add Update Discount Modal */}
      <Modal isOpen={addModal} toggle={toggleAddModal} fullscreen>
        <ModalHeader toggle={toggleAddModal}>
          <h4 className="MainPage__modal-header">
            Shoes Store <img src={brandLogo} alt="brandLogo" />
          </h4>
        </ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              <Col md={6}>
                <div className="shadow">
                  <h6 className="bg-info py-2 px-3 text-white fw-bold">
                    Information
                  </h6>
                  <div className="px-3 pb-1">
                    <FormGroup floating>
                      <Input
                        id="employeeId"
                        disabled
                        name="employeeId"
                        value={
                          capitalizeFirstLetter(
                            selectedImportOrder
                              ? selectedImportOrder.employeeId.firstname
                              : auth.data.firstname
                          ) +
                          " " +
                          capitalizeFirstLetter(
                            selectedImportOrder
                              ? selectedImportOrder.employeeId.lastname
                              : auth.data.lastname
                          )
                        }
                      />
                      <Label for="employeeId">Employee</Label>
                    </FormGroup>

                    <FormGroup floating>
                      <Input
                        id="supplierId"
                        name="supplierId"
                        type="select"
                        onChange={(e) => setSupplier(e.target.value)}
                        disabled={
                          selectedImportOrder?.state ||
                          (selectedImportOrder &&
                            selectedImportOrder?.employeeId?._id !==
                              auth?.data?.employeeId)
                        }
                      >
                        {suppliers.map((supplier) => (
                          <option key={supplier._id} value={supplier._id}>
                            {supplier.name}
                          </option>
                        ))}
                      </Input>
                      <Label for="supplierId">Supplier</Label>
                    </FormGroup>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="shadow" style={{ height: "195px" }}>
                  <h6 className="bg-info py-2 px-3 text-white fw-bold">
                    Content
                  </h6>
                  <div className="px-3 pb-1">
                    <FormGroup floating>
                      <Input
                        id="content"
                        type="textarea"
                        name="content"
                        disabled={
                          selectedImportOrder?.state ||
                          (selectedImportOrder &&
                            selectedImportOrder?.employeeId?._id !==
                              auth?.data?.employeeId)
                        }
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                      <Label for="content">Note</Label>
                    </FormGroup>
                  </div>
                </div>
              </Col>
            </Row>

            <FormGroup className="mt-4">
              <InputGroup className="position-relative">
                <InputGroupText>
                  <code className="text-secondary">Products</code>
                </InputGroupText>
                <Input
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  disabled={
                    selectedImportOrder?.state ||
                    (selectedImportOrder &&
                      selectedImportOrder?.employeeId?._id !==
                        auth?.data?.employeeId)
                  }
                />
                <InputGroupText className="text-white bg-info">
                  <i className="zmdi zmdi-search"></i>
                </InputGroupText>

                {searchName && (
                  <div
                    className="position-absolute top-100  shadow p-3"
                    style={{
                      backgroundColor: "#fff",
                      width: "93%",
                      left: "7%",
                      zIndex: 2,
                    }}
                  >
                    {filterProducts.length > 0 &&
                      filterProducts.map((product, index) => (
                        <div
                          key={index}
                          className="d-flex align-items-center"
                          style={{
                            overflow: "hidden",
                            borderBottom: "1px solid #dedede",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setCurrentImportOrders([
                              ...currentImportOrders,
                              {
                                ...product,
                                originalPrice: 0,
                                quantityStock: 0,
                                productDetail: product.productDetail.map(
                                  (productDetailItem) => ({
                                    ...productDetailItem,
                                    sizeAndQuantity:
                                      productDetailItem.sizeAndQuantity.map(
                                        (item) => ({
                                          ...item,
                                          quantity: 0,
                                        })
                                      ),
                                  })
                                ),
                              },
                            ]);

                            setSearchName("");
                          }}
                        >
                          <img
                            style={{
                              position: "relative",
                              top: "-16px",
                            }}
                            className="img-fluid"
                            width={64}
                            height={64}
                            src={product.productDetail[0].images[0]}
                            alt={product._id}
                          />

                          <div className="ms-4">
                            <h6>
                              <code className="fw-bolder text-dark">
                                {product.name}
                              </code>
                            </h6>

                            <div className="d-flex align-items-center">
                              {product.productDetail.map((item, i) => (
                                <div
                                  key={i}
                                  className="shadow me-2"
                                  style={{
                                    width: "28px",
                                    height: "28px",
                                    borderRadius: "50%",
                                    marginBottom: "8px",
                                    backgroundColor: item.color.color,
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}

                    {filterProducts.length === 0 && searchName && (
                      <code className="text-secondary text-uppercase">
                        No products found
                      </code>
                    )}
                  </div>
                )}
              </InputGroup>
            </FormGroup>

            <Row className="px-2">
              <Table className="shadow">
                <thead>
                  <tr className="bg-info text-white">
                    <th style={{ width: "50px" }}>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>Original Price</th>
                    <th>Total Quantity</th>
                    <th>Total Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentImportOrders?.map((product, index) => (
                    <tr key={index} style={{ verticalAlign: "middle" }}>
                      <th style={{ width: "50px" }} scope="row">
                        {index + 1}
                      </th>
                      <td style={{ overflow: "hidden" }}>
                        <img
                          style={{
                            position: "relative",
                            top: "-16px",
                          }}
                          className="img-fluid"
                          width={64}
                          height={64}
                          src={product.productDetail?.[0].images[0]}
                          alt={product._id}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>
                        {product?.productDetail?.map((item, i) => (
                          <div key={i}>
                            <div
                              className="shadow"
                              style={{
                                width: "38px",
                                height: "38px",
                                borderRadius: "50%",
                                marginLeft: "auto",
                                marginRight: "auto",
                                backgroundColor: item.color.color,
                              }}
                            />
                            {item.sizeAndQuantity.slice(1).map((item) => (
                              <div
                                key={item.size.size}
                                style={{ height: "38px" }}
                                className="mb-1"
                              />
                            ))}
                          </div>
                        ))}
                      </td>
                      <td>
                        {product?.productDetail?.map((productDetailItem) =>
                          productDetailItem.sizeAndQuantity.map((item) => (
                            <div
                              key={productDetailItem.color._id + item.size._id}
                              style={{ height: "38px", lineHeight: "38px" }}
                              className="mb-1"
                            >
                              {item.size.size}
                            </div>
                          ))
                        )}
                      </td>
                      <td>
                        {product?.productDetail?.map((productDetailItem) =>
                          productDetailItem.sizeAndQuantity.map((item) => (
                            <InputGroup
                              key={productDetailItem.color._id + item.size._id}
                              className="mb-1"
                            >
                              <InputGroupText>#</InputGroupText>
                              <Input
                                disabled={
                                  selectedImportOrder?.state ||
                                  (selectedImportOrder &&
                                    selectedImportOrder?.employeeId?._id !==
                                      auth?.data?.employeeId)
                                }
                                type="number"
                                min={0}
                                id={productDetailItem.color._id + item.size._id}
                                onChange={(e) => {
                                  const cloneImportOrders = [
                                    ...currentImportOrders,
                                  ];
                                  cloneImportOrders[index] = {
                                    ...product,
                                    quantityStock: product.productDetail
                                      .map((productDetailItem) =>
                                        productDetailItem.sizeAndQuantity.map(
                                          (item) =>
                                            parseInt(
                                              document.getElementById(
                                                productDetailItem.color._id +
                                                  item.size._id
                                              ).value
                                            ) || 0
                                        )
                                      )
                                      .reduce(
                                        (array, item) => array.concat(item),
                                        []
                                      )
                                      .reduce((sum, item) => (sum += item), 0),
                                    productDetail: product?.productDetail?.map(
                                      (productDetailItem) => ({
                                        ...productDetailItem,

                                        sizeAndQuantity:
                                          productDetailItem.sizeAndQuantity.map(
                                            (item) => {
                                              if (
                                                e.target.id ===
                                                productDetailItem.color._id +
                                                  item.size._id
                                              ) {
                                                return {
                                                  ...item,
                                                  quantity: parseInt(
                                                    e.target.value || 0
                                                  ),
                                                };
                                              } else {
                                                return item;
                                              }
                                            }
                                          ),
                                      })
                                    ),
                                  };
                                  setCurrentImportOrders(cloneImportOrders);
                                }}
                                value={item.quantity}
                              />
                            </InputGroup>
                          ))
                        )}
                      </td>
                      <td>
                        <InputGroup className="mb-1 ">
                          <InputGroupText className="text-secondary">
                            $
                          </InputGroupText>
                          <Input
                            disabled={
                              selectedImportOrder?.state ||
                              (selectedImportOrder &&
                                selectedImportOrder?.employeeId?._id !==
                                  auth?.data?.employeeId)
                            }
                            min={0}
                            type="number"
                            value={product.originalPrice}
                            onChange={(e) => {
                              const cloneImportOrders = [
                                ...currentImportOrders,
                              ];
                              cloneImportOrders[index].originalPrice = parseInt(
                                e.target.value || 0
                              );
                              setCurrentImportOrders(cloneImportOrders);
                            }}
                          />
                        </InputGroup>
                      </td>

                      <td>
                        <code className="ms-5 text-dark fw-bold fs-6">
                          {product.quantityStock}
                        </code>
                      </td>
                      <td>
                        <code className="fw-bold text-dark fs-6">
                          ${product.quantityStock * product.originalPrice}
                        </code>
                      </td>

                      <td>
                        <Button
                          outline
                          color="danger d-block m-auto"
                          style={{ position: "relative", top: "-4px" }}
                          disabled={
                            selectedImportOrder?.state ||
                            (selectedImportOrder &&
                              selectedImportOrder?.employeeId?._id !==
                                auth?.data?.employeeId)
                          }
                        >
                          <i
                            onClick={() =>
                              handleDeleteCurrentImportOrder(product)
                            }
                            className="zmdi zmdi-delete"
                          />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <div className="me-auto d-flex align-items-center">
            <code className="fw-bold fs-6 text-secondary">
              Total quantity:{" "}
              <Badge className="bg-info shadow">
                {currentImportOrders.reduce(
                  (sum, importOrderItem) => sum + importOrderItem.quantityStock,
                  0
                )}
              </Badge>
            </code>
            <code className="fw-bold fs-6 text-secondary d-block ms-4">
              Total money:{" "}
              <Badge className="bg-warning shadow">
                $
                {currentImportOrders.reduce(
                  (sum, importOrderItem) =>
                    sum +
                    importOrderItem.quantityStock *
                      importOrderItem.originalPrice,
                  0
                )}
              </Badge>
            </code>
          </div>
          <Button
            style={{
              display:
                selectedImportOrder && auth.data.isAdmin ? "block" : "none",
            }}
            color="danger"
            className="text-white fw-bold shadow"
            size="sm"
            onClick={handleAcceptImportOrder}
            disabled={
              loading ||
              currentImportOrders.length === 0 ||
              selectedImportOrder?.state
            }
          >
            Accept Import Order
            {loading && (
              <Spinner size="sm" className="ms-2">
                loading
              </Spinner>
            )}
          </Button>{" "}
          <Button
            style={{
              display:
                !selectedImportOrder ||
                selectedImportOrder?.employeeId?._id === auth?.data?.employeeId
                  ? "block"
                  : "none",
            }}
            color="info"
            className="text-white fw-bold shadow"
            size="sm"
            onClick={handleAddImportOrder}
            disabled={
              loading ||
              currentImportOrders.length === 0 ||
              selectedImportOrder?.state
            }
          >
            {!selectedImportOrder ? "Confirm" : "Update"}
            {loading && (
              <Spinner size="sm" className="ms-2">
                loading
              </Spinner>
            )}
          </Button>{" "}
          <Button
            color="secondary"
            className="fw-bold shadow"
            size="sm"
            disabled={loading}
            onClick={toggleAddModal}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete Discount modal */}
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>
          <h4 className="MainPage__modal-header">
            Shoes Store <img src={brandLogo} alt="brandLogo" />
          </h4>
        </ModalHeader>
        <ModalBody>Are you sure you want to this import order?</ModalBody>
        <ModalFooter>
          <Button
            disabled={loading}
            color="primary"
            size="sm"
            onClick={handleDeleteImportOrder}
          >
            Confirm
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
