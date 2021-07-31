import React from "react";
import PropTypes from "prop-types";
import "./tablefooter.scss";
import Pagination from "components/Pagination";

TableFooter.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

function TableFooter(props) {
  const { pagination, onPageChange } = props;
  const { page, limit, totalRow } = pagination;

  return (
    <div className="TableFooter shadow">
      <div>{`Showing ${(page - 1) * limit + 1} to ${
        limit * page
      } of ${totalRow} entries`}</div>
      <Pagination onPageChange={onPageChange} pagination={pagination} />
    </div>
  );
}

export default TableFooter;
