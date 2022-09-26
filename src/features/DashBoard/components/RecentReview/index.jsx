import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { capitalizeFirstLetter } from "utils/common";
import "./recentreview.scss";
RecentReview.propTypes = {
  reviews: PropTypes.array.isRequired,
};

function RecentReview(props) {
  const { reviews } = props;
  return (
    <div className="RecentReview shadow rounded-2">
      <header className="d-flex justify-content-between">
        <div className="text-uppercase">Recent reviews</div>
        <div>
          <Link to="/review">See All</Link>
        </div>
      </header>

      <Table borderless>
        <tbody>
          {reviews.slice(0, 5).map((review) => (
            <tr key={review._id} style={{ borderBottom: "1px solid #dedede" }}>
              <td className="pb-0">
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
                    src={`${review.productId.productDetail[0].images[0]}`}
                    alt={review._id}
                  />
                  <div>
                    <div className="ms-3">{review.productId.name}</div>
                    <code className="ms-3 text-secondary">
                      Reviewed by{" "}
                      {capitalizeFirstLetter(review.userId.firstname) +
                        " " +
                        capitalizeFirstLetter(review.userId.lastname)}
                    </code>
                  </div>
                </div>
              </td>

              <td className="text-end pb-0">
                {Array.from(Array(5).keys()).map((key) => {
                  if (review.star >= key + 1) {
                    return (
                      <i key={key} className="zmdi zmdi-star text-warning"></i>
                    );
                  } else {
                    return (
                      <i
                        key={key}
                        className="zmdi zmdi-star-outline text-warning"
                      ></i>
                    );
                  }
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default RecentReview;
