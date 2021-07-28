import PropTypes from "prop-types";
import React from "react";
import { Button, Spinner } from "reactstrap";
import "./actionbutton.scss";

ActionButton.propTypes = {
  onCloseModelClick: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,
};

function ActionButton(props) {
  const { onCloseModelClick, isSubmitting, loading, model } = props;
  return (
    <div className="ActionButton">
      <Button
        onClick={onCloseModelClick}
        color="secondary"
        className="text-light"
        disabled={isSubmitting}
        style={{ position: "relative", padding: "0.4rem 1.5rem" }}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        color="primary"
        className="ms-2 text-light"
        disabled={isSubmitting}
        style={{ position: "relative", padding: "0.4rem 1.5rem" }}
      >
        {loading && (
          <Spinner
            color="light"
            size="sm"
            style={{
              position: "absolute",
              right: "0.25rem",
              top: "0.8rem",
            }}
          >
            {" "}
          </Spinner>
        )}
        {!model.data ? "Add" : "Update"}
      </Button>{" "}
    </div>
  );
}

export default ActionButton;
