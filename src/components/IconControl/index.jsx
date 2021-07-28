import React from "react";
import "./iconcontrol.scss";

function IconControl(props) {
  return (
    <React.Fragment>
      <input
        className="d-none"
        defaultChecked={true}
        type="checkbox"
        id="check"
      />
      <label className="IconControl" htmlFor="check">
        <i className="zmdi zmdi-menu" id="btn" />
        <i className="zmdi zmdi-close" id="cancel" />
      </label>
    </React.Fragment>
  );
}

export default IconControl;
