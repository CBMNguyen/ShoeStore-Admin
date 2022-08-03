import PropTypes from "prop-types";
import React from "react";
import "./formheader.scss";
import brandLogo from "../../assets/images/brandLogo.png";

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
      <h4>
        Shoes Store <img src={brandLogo} alt="brandLogo" />
      </h4>{" "}
      <hr />
      <div onClick={handCloseModelClick} className="FormHeader__close">
        <i className="zmdi zmdi-close" />
      </div>
    </div>
  );
}

export default FormHeader;
