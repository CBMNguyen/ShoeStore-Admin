import Loading from "components/Loading";
import TableFooter from "components/TableFooter";
import { PRODUCT_TOAST_OPTIONS } from "constants/globals";
import ReviewDeleteModel from "features/Review/components/ReviewDeleteModel";
import ReviewList from "features/Review/components/ReviewList";
import {
  deleteReview,
  fetchReviews,
  updateReview,
} from "features/Review/reviewSlice";
import useModel from "hooks/useModel";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { showToastError, showToastSuccess } from "utils/common";
import "./mainpage.scss";

function MainPage(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const [filter, setFilter] = useState({
    page: 1,
    limit: 8,
  });

  const handlePageChange = (page) => {
    setFilter({ ...filter, page });
  };

  const reviewState = useSelector((state) => state.review);

  const reviews = reviewState.review;

  const { loading } = reviewState;

  const removeModel = useModel();

  const handleReviewDelete = async (reviewId) => {
    try {
      await showToastSuccess(dispatch(deleteReview(reviewId)));
      removeModel.closeModel();
    } catch (error) {
      showToastError(error);
    }
  };

  const handleCheckStateClick = async (data) => {
    try {
      await dispatch(
        updateReview({ _id: data._id, review: { state: !data.state } })
      );
      toast(
        `Successfully ${!data.state ? "Approve" : "Not Approve"} this
         review.`,
        { ...PRODUCT_TOAST_OPTIONS }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const start = (filter["page"] - 1) * filter["limit"];
  const end = filter["page"] * filter["limit"];

  return loading && reviews.length === 0 ? (
    <Loading />
  ) : (
    <div className="MainPage">
      <div className="MainPage__TableHeader">
        <div className="MainPage__add">
          <i className="zmdi zmdi-plus-circle" />
        </div>
      </div>
      <ReviewList
        loading={loading}
        reviews={reviews.slice(start, end)}
        showRemoveModel={removeModel.showModel}
        onCheckStateClick={handleCheckStateClick}
      />

      <TableFooter
        filter={filter}
        totalRow={reviews.length}
        onPageChange={handlePageChange}
      />

      {removeModel.model.show && (
        <ReviewDeleteModel
          loading={loading}
          data={removeModel.model.data}
          onRemoveClick={handleReviewDelete}
          closeModel={removeModel.closeModel}
        />
      )}
    </div>
  );
}

export default MainPage;
