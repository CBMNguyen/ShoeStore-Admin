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
        <i
          className="zmdi zmdi-menu"
          id="btn"
          style={{ position: "fixed", top: "18px" }}
        />
        <i
          className="zmdi zmdi-close"
          id="cancel"
          style={{ position: "fixed", top: "22px" }}
        />
      </label>
    </React.Fragment>
  );
}

export default IconControl;
