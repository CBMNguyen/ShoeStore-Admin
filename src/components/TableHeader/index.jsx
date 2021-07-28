import PropTypes from "prop-types";
import React from "react";
import { Input } from "reactstrap";
import "./tableheader.scss";

TableHeader.propTypes = {
  showModel: PropTypes.func.isRequired,
};

function TableHeader(props) {
  const { showModel } = props;

  const handleModelClick = () => {
    if (!showModel) return;
    showModel();
  };

  return (
    <div className="TableHeader">
      <div onClick={handleModelClick}>
        <i className="zmdi zmdi-plus-circle" />
      </div>
      <Input
        className="w-25"
        name="name"
        placeholder="Search name product..."
      />
    </div>
  );
}

export default TableHeader;
