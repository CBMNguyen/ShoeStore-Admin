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
  const { filter, onPageChange } = props;
  const { page, limit, totalRow } = filter;

  const totalPage = Math.ceil(totalRow / limit);

  const handlePageChange = (page) => {
    if (!onPageChange) return;
    onPageChange(page);
  };

  return (
    <div className="Pagination">
      <Button
        color="light"
        disabled={page <= 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <i className="zmdi zmdi-chevron-left" />
      </Button>
      <div
        className={classNames("Pagination__number", {
          "Pagination__number--active": page === 1,
        })}
        onClick={() => handlePageChange(1)}
      >
        1
      </div>
      <div
        className={classNames("Pagination__number", {
          "Pagination__number--active": page === 2,
        })}
        onClick={() => handlePageChange(2)}
      >
        2
      </div>
      <div
        className={classNames("Pagination__number", {
          "Pagination__number--active": page === 3,
        })}
        onClick={() => handlePageChange(3)}
      >
        3
      </div>
      <Button
        color="light"
        disabled={page >= totalPage}
        onClick={() => handlePageChange(page + 1)}
      >
        <i className="zmdi zmdi-chevron-right" />
      </Button>
    </div>
  );
}

export default Pagination;
