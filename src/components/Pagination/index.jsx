import React from "react";
import PropTypes from "prop-types";
import "./pagination.scss";
import { Button } from "reactstrap";
import classNames from "classnames";

Pagination.propTypes = {
  filter: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
  onPageChange: null,
};

function Pagination(props) {
  const { filter, onPageChange, totalRow } = props;
  const { page, limit } = filter;
  const totalPage = Math.ceil(totalRow / limit);

  const handlePageChange = (page) => {
    if (!onPageChange) return;
    onPageChange(page);
  };

  // fake array to render number item
  let filterList = [];
  for (let index = 0; index < totalPage; index++) {
    filterList[index] = index + 1;
  }

  if ((page > 4) & ((page - 1) % 4 === 0)) {
    filterList.splice(0, page - 1);
    filterList = filterList.slice(0, 4);
  } else if (page > 4 && (page - 1) % 4 !== 0) {
    filterList.splice(0, page - (page % 4 === 0 ? 4 : page % 4));
    filterList = filterList.slice(0, 4);
  } else {
    filterList = filterList.slice(0, 4);
  }

  return (
    <div className="Pagination">
      {/* previous button */}
      <Button
        className="btn btn-sm me-4"
        type="button"
        color="light"
        disabled={page <= 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <i className="zmdi zmdi-chevron-left d-inline-block m-auto" />
      </Button>
      {/* numbers */}
      {filterList.map((item) => (
        <button
          disabled={totalPage < item}
          key={item}
          className={classNames("Pagination__number", {
            "Pagination__number--active": page === item,
          })}
          onClick={() => handlePageChange(item)}
        >
          {item}
        </button>
      ))}

      {/* Next Button */}
      <Button
        className="btn btn-sm ms-4"
        type="button"
        color="light"
        disabled={page >= totalPage}
        onClick={() => handlePageChange(page + 1)}
      >
        <i className="zmdi zmdi-chevron-right d-inline-block m-auto" />
      </Button>
    </div>
  );
}

export default Pagination;
