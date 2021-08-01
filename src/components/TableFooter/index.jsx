import React from "react";
import PropTypes from "prop-types";
import "./tablefooter.scss";
import Pagination from "components/Pagination";

TableFooter.propTypes = {
  filter: PropTypes.object.isRequired,
  totalRow: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

function TableFooter(props) {
  const { filter, totalRow, onPageChange } = props;
  const { page, limit } = filter;

  return (
    <div className="TableFooter shadow">
      <div>{`Showing ${(page - 1) * limit + 1} to ${
        limit * page
      } of ${totalRow} entries`}</div>
      <Pagination
        filter={{ ...filter, totalRow }}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default TableFooter;
