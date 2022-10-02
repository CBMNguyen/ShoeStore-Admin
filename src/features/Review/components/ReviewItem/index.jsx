function ReviewItem({
  review,
  index,
  toggle,
  toggleReview,
  setSelectedReview,
  showRemoveModel,
}) {
  return (
    <tr style={{ verticalAlign: "middle", fontSize: "15px" }}>
      <th>{index + 1}</th>
      <td>
        {review.userId.image && (
          <img
            className="rounded-circle OrderItem__avatar shadow border-1"
            src={review.userId.image}
            alt={review.userId._id}
            width={40}
            height={40}
          />
        )}
        {!review.userId.image && (
          <div
            style={{ width: "40px", height: "40px", backgroundColor: "#000" }}
            className="d-flex align-items-center justify-content-center rounded-circle text-white shadow border-1 float-start"
          >
            {review.userId.firstname[0]}
          </div>
        )}
        <code
          className="text-white fw-bold ms-3 px-2 py-1 rounded-2"
          style={{
            backgroundColor: "deeppink",
            position: "relative",
            top: !review.userId.image ? "8px" : "2px",
          }}
        >{`${review.userId.firstname} ${review.userId.lastname}`}</code>
      </td>
      <td>
        <code
          className="px-2 py-1 text-white rounded-2 fw-bold"
          style={{ backgroundColor: "cyan" }}
        >
          {review.productId.name}
        </code>
      </td>
      <td>
        {Array.from(Array(5).keys()).map((key) => {
          if (review.star >= key + 1) {
            return <i key={key} className="zmdi zmdi-star text-warning"></i>;
          } else {
            return (
              <i key={key} className="zmdi zmdi-star-outline text-warning"></i>
            );
          }
        })}
      </td>
      <td>
        <p className="m-0" style={{ maxWidth: "350px" }}>
          <code className="text-secondary">{review.content}</code>
        </p>
      </td>
      <td>
        <code
          className={
            review.state
              ? "bg-success px-2 py-1 text-white rounded-2 fw-bold"
              : "bg-danger px-2 py-1 text-white rounded-2 fw-bold"
          }
        >
          {review.state ? "Approved" : "Not Approve yet"}
        </code>
      </td>
      <td>
        {!review.state && (
          <i
            onClick={() => {
              toggle();
              setSelectedReview(review);
            }}
            className="zmdi zmdi-check-circle text-success"
          ></i>
        )}
        {review.state && (
          <i
            onClick={() => {
              toggle();
              setSelectedReview(review);
            }}
            className="zmdi zmdi-close-circle text-secondary"
          ></i>
        )}
        <i
          onClick={() => {
            setSelectedReview(review);
            toggleReview();
          }}
          className="zmdi zmdi-comment-text text-info ms-2"
        ></i>
        <i
          onClick={() => showRemoveModel(review)}
          className="zmdi zmdi-delete text-danger ps-2"
        />
      </td>
    </tr>
  );
}

export default ReviewItem;
