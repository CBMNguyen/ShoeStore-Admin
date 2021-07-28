import PropTypes from "prop-types";
import React from "react";
import "./formheader.scss";

FormHeader.propTypes = {
  closeModel: PropTypes.func,
};

FormHeader.defaultProps = {
  closeModel: null,
};

function FormHeader(props) {
  const { closeModel } = props;
  const handCloseModelClick = () => {
    if (!closeModel) return;
    closeModel();
  };

  return (
    <div className="FormHeader">
      <h4>Shoes Store🧦</h4>
      <hr />

      <div onClick={handCloseModelClick} className="FormHeader__close">
        <i className="zmdi zmdi-close" />
      </div>
    </div>
  );
}

export default FormHeader;
