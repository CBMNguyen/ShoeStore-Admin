import PropTypes from "prop-types";
import React from "react";
import { Button, Spinner } from "reactstrap";
import "./actionsbutton.scss";

ActionsButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  onCloseModelClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func,
};

ActionsButton.defaultProps = {
  onRemoveClick: null,
};

function ActionsButton(props) {
  const { loading, onCloseModelClick, onRemoveClick, data } = props;

  const handleRemoveClick = (id) => {
    if (!onRemoveClick) return;
    onRemoveClick(id);
  };

  return (
    <div className="ActionsButton">
      <Button
        color="secondary"
        className="text-light"
        disabled={loading}
        onClick={onCloseModelClick}
        style={{ position: "relative", padding: "0.4rem 1.5rem" }}
      >
        Cancel
      </Button>
      <Button
        color="primary"
        className="ms-2 text-light"
        onClick={() => handleRemoveClick(data._id)}
        disabled={loading}
        type="submit"
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
        Confirm
      </Button>{" "}
    </div>
  );
}

export default ActionsButton;
