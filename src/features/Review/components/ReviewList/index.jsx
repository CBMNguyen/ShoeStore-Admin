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
import ReviewItem from "../ReviewItem";
import brandLogo from "../../../../assets/images/brandLogo.png";
import "./reviewlist.scss";

function ReviewList({ reviews, loading, onCheckStateClick, showRemoveModel }) {
  const [modal, setModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState();

  const toggle = () => setModal(!modal);
  const handleCheckStateClick = async () => {
    if (!onCheckStateClick) return;
    await onCheckStateClick(selectedReview);
    toggle();
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
              showRemoveModel={showRemoveModel}
              setSelectedReview={setSelectedReview}
            />
          ))}
        </tbody>

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
      </Table>
    </div>
  );
}

export default ReviewList;
