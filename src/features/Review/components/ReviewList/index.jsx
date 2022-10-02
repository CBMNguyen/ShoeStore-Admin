import React, { useEffect, useState } from "react";
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
import ReviewItem from "../ReviewItem";
import brandLogo from "../../../../assets/images/brandLogo.png";
import "./reviewlist.scss";
import feedbackApi from "api/feedback";
import FeedbackForm from "../FeedbackForm";
import { toast } from "react-toastify";
import { PRODUCT_TOAST_OPTIONS, STAR_MEANINGS } from "constants/globals";
import FeedbackItem from "../FeedbackItem";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

function ReviewList({
  reviews,
  auth,
  loading,
  onCheckStateClick,
  showRemoveModel,
}) {
  const [modal, setModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState();

  const toggle = () => setModal(!modal);
  const handleCheckStateClick = async () => {
    if (!onCheckStateClick) return;
    await onCheckStateClick(selectedReview);
    toggle();
  };

  // Review Modal
  const [reviewModal, setReviewModal] = useState(false);
  const toggleReview = () => setReviewModal(!reviewModal);

  // Feedback List
  const [feedbacks, setFeedbacks] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  const [removeConfirmModal, setRemoveConfirmModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState();

  const [isEditUpdateFeedbackForm, setIsEditUpdateFeedbackForm] =
    useState(false);

  const toggleFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  const toggleFeedBackForm = (e) => {
    e.stopPropagation();
    setShowFeedbackForm(!showFeedbackForm);
  };

  const toggleRemoveModal = (e) => {
    e.stopPropagation();
    setRemoveConfirmModal(!removeConfirmModal);
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await feedbackApi.get(selectedReview._id);
        setFeedbacks(data.feedbacks);
      } catch (error) {
        console.log(error);
      }
    };
    selectedReview?._id && fetchFeedbacks();
  }, [selectedReview?._id]);

  const handleAddReviewFeedback = async (data) => {
    data.employeeId = auth.data.employeeId;
    data.productId = selectedReview.productId._id;
    data.reviewId = selectedReview._id;
    try {
      setFeedbackLoading(true);
      const { newFeedback } = await feedbackApi.post(data);
      setFeedbacks(feedbacks.concat(newFeedback));
      setFeedbackLoading(false);
      setShowFeedback(true);
      toast("Add feedback successful", { ...PRODUCT_TOAST_OPTIONS });
    } catch (error) {
      setFeedbackLoading(false);
      setShowFeedbackForm(false);
      toast.error(error.message);
    }
  };

  const handleUpdateReviewFeedback = async (data) => {
    try {
      setFeedbackLoading(true);
      await feedbackApi.patch(selectedFeedback._id, data);
      setFeedbacks(
        feedbacks.map((feedback) => {
          if (feedback._id === selectedFeedback._id) {
            return { ...feedback, ...data };
          } else {
            return feedback;
          }
        })
      );
      setFeedbackLoading(false);
      setIsEditUpdateFeedbackForm(false);
      setShowFeedback(true);
      toast("Update feedback successful", { ...PRODUCT_TOAST_OPTIONS });
    } catch (error) {
      setFeedbackLoading(false);
      setShowFeedbackForm(false);
      toast.error(error.message);
    }
  };

  const handleRemoveFeedback = async () => {
    try {
      setFeedbackLoading(true);
      await feedbackApi.remove(selectedFeedback._id);
      setFeedbacks(
        feedbacks.filter((feedback) => feedback._id !== selectedFeedback._id)
      );
      setFeedbackLoading(false);
      setRemoveConfirmModal(false);
      toast("Delete feedback successfully.", { ...PRODUCT_TOAST_OPTIONS });
    } catch (error) {
      console.log(error);
      setFeedbackLoading(false);
      setRemoveConfirmModal(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="ReviewList">
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Product</th>
            <th>Star</th>
            <th>Content</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <ReviewItem
              index={index}
              key={review._id}
              review={review}
              toggle={toggle}
              toggleReview={toggleReview}
              showRemoveModel={showRemoveModel}
              setSelectedReview={setSelectedReview}
            />
          ))}
        </tbody>

        {/* Update Review State Modal */}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            <h4 className="ReviewList__brand">
              Shoes Store <img src={brandLogo} alt="brandLogo" />
            </h4>
          </ModalHeader>
          <ModalBody>
            Are you sure you want to{" "}
            <code className="text-dark fw-bold">
              {selectedReview?.state ? "Not approve " : "Approve "}
            </code>
            review of
            <Badge className="bg-danger ms-1">{`${selectedReview?.userId?.firstname} ${selectedReview?.userId?.lastname}`}</Badge>{" "}
            account?
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={loading}
              color="primary"
              size="sm"
              onClick={handleCheckStateClick}
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

        <Modal isOpen={reviewModal} toggle={toggleReview} size="lg">
          <ModalHeader toggle={toggleReview}>
            <h4 className="ReviewList__brand">
              Shoes Store <img src={brandLogo} alt="brandLogo" />
            </h4>
          </ModalHeader>
          <ModalBody>
            <div
              key={selectedReview?._id}
              onClick={toggleFeedback}
              className="rounded-2 p-4"
              style={{
                cursor: "pointer",
              }}
            >
              <div className="d-flex">
                <div>
                  {selectedReview?.userId?.image && (
                    <img
                      width={68}
                      height={68}
                      className="rounded-circle"
                      style={{ objectFit: "cover" }}
                      src={selectedReview?.userId?.image}
                      alt={selectedReview?.review?._id}
                    />
                  )}

                  {!selectedReview?.userId?.image && (
                    <div
                      className="shadow"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        width: "68px",
                        height: "68px",
                        borderRadius: "50%",
                        backgroundColor: "#000",
                        color: "#fff",

                        fontWeight: "bolder",
                        fontSize: "38px",
                      }}
                    >
                      <code className="text-white">
                        {selectedReview?.userId?.firstname?.[0]}
                      </code>
                    </div>
                  )}
                </div>

                <div className="ms-3">
                  <code className="fw-bold text-dark">{`${selectedReview?.userId?.firstname} ${selectedReview?.userId?.lastname}`}</code>
                  <code className="ms-2 text-secondary">
                    {format(selectedReview?.updatedAt)}
                  </code>
                  <div className="d-flex align-items-center">
                    {Array.from(Array(selectedReview?.star).keys()).map(
                      (key) => (
                        <i
                          key={key}
                          className="zmdi zmdi-star fs-6 text-warning"
                        ></i>
                      )
                    )}
                    <div className="ms-2">
                      <code className="text-dark">
                        {STAR_MEANINGS[selectedReview?.star]}
                      </code>
                    </div>
                  </div>
                  <div className="text-success">
                    <i className="zmdi zmdi-check"></i>{" "}
                    <code className="text-success">Đã mua hàng</code>
                  </div>
                  <div>{selectedReview?.content}</div>
                  <code
                    className="fw-bold"
                    style={{ cursor: "pointer" }}
                    onClick={toggleFeedback}
                  >
                    {showFeedback ? (
                      <i className="zmdi zmdi-caret-up-circle"></i>
                    ) : (
                      <i className="zmdi zmdi-caret-down-circle"></i>
                    )}{" "}
                    <span style={{ position: "relative", top: "-1px" }}>
                      Feedback {feedbacks.length}
                    </span>
                  </code>
                </div>

                <div className="d-flex flex-grow-1 justify-content-end">
                  <div className="ms-1">
                    {selectedReview?._id && (
                      <i
                        onClick={toggleFeedBackForm}
                        className="zmdi zmdi-comment-text text-info me-1 fs-4"
                      ></i>
                    )}
                  </div>
                </div>
              </div>

              <FeedbackForm
                isNested={false}
                feedback={selectedReview}
                updateFeedback={selectedFeedback}
                feedbackLoading={feedbackLoading}
                onAddFeedback={handleAddReviewFeedback}
                onUpdateFeedback={handleUpdateReviewFeedback}
                showFeedbackForm={showFeedbackForm}
                setShowFeedbackForm={setShowFeedbackForm}
                isEditUpdateFeedbackForm={isEditUpdateFeedbackForm}
              />

              {showFeedback &&
                feedbacks.map((feedback) => (
                  <FeedbackItem
                    user={selectedReview.userId}
                    key={feedback._id}
                    review={selectedReview}
                    feedback={feedback}
                    feedbacks={feedbacks}
                    setSelectedFeedback={setSelectedFeedback}
                    setRemoveConfirmModal={setRemoveConfirmModal}
                    setShowFeedbackForm={setShowFeedbackForm}
                    feedbackLoading={feedbackLoading}
                    onAddFeedback={handleAddReviewFeedback}
                    onUpdateFeedback={handleUpdateReviewFeedback}
                    isEditUpdateFeedbackForm={isEditUpdateFeedbackForm}
                    setIsEditUpdateFeedbackForm={setIsEditUpdateFeedbackForm}
                  />
                ))}

              {/* Remove review modal */}
              <Modal isOpen={removeConfirmModal} toggle={toggleRemoveModal}>
                <ModalHeader toggle={toggleRemoveModal}>
                  <div>
                    <h2
                      style={{
                        position: "relative",
                        top: "2px",
                        fontFamily: "Pacifico",
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                      className="my-0"
                    >
                      <Link className="text-decoration-none text-dark" to="/">
                        Shoes Store{" "}
                        <img
                          style={{
                            position: "relative",
                            top: "-4px",
                            width: "32px",
                            height: "32px",
                            objectFit: "cover",
                          }}
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
                    Are you sure you want to remove this feedback ?
                  </code>
                </ModalBody>
                <ModalFooter>
                  <Button
                    disabled={feedbackLoading}
                    className="btn btn-sm"
                    color="primary"
                    onClick={handleRemoveFeedback}
                  >
                    Agree
                    {feedbackLoading && (
                      <Spinner className="ms-2" size="sm">
                        Loading
                      </Spinner>
                    )}
                  </Button>{" "}
                  <Button
                    disabled={feedbackLoading}
                    className="btn btn-sm"
                    color="secondary"
                    onClick={toggleRemoveModal}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="text-uppercase"
              onClick={toggleReview}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </Table>
    </div>
  );
}

export default ReviewList;
