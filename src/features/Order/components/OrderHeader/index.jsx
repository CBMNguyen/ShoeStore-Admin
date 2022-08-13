import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { Button, Input } from "reactstrap";
import "./orderheader.scss";

OrderHeader.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  onNameChange: PropTypes.func,
  onResetFilter: PropTypes.func,
  onOptionsChange: PropTypes.func,
};

OrderHeader.defaultProps = {
  options: [],
  onNameChange: null,
  onResetFilter: null,
  onOptionsChange: null,
  name: PropTypes.string.isRequired,
};

function OrderHeader(props) {
  const [value, setValue] = useState("");
  const { register } = useForm();

  const { onOptionsChange, onNameChange, options, name, onResetFilter } = props;

  const typingTimeoutRef = useRef(null);

  // Search name debounce

  const handleNameChange = (e) => {
    const text = e.target.value;
    setValue(text);

    if (!onNameChange) return;

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      onNameChange(text);
    }, 500);
  };

  const handleOptionsChange = (order) => {
    if (!onOptionsChange) return;
    onOptionsChange(order);
  };

  const handleResetFilter = () => {
    if (!onResetFilter) return;
    onResetFilter();
    setValue("");
  };

  return (
    <div className="OrderHeader">
      <header>
        <h2>ORDER LIST</h2>
      </header>

      <div className="OrderHeader__filter">
        <div className="me-2 w-50">
          <i className="zmdi zmdi-search" />
          <Input
            name="name"
            placeholder="Search user name ..."
            value={value}
            onChange={handleNameChange}
          />
        </div>

        {options && (
          <Select
            className="me-2"
            {...register(name)}
            options={[{ label: "All", value: "" }, ...options]}
            placeholder={`Search state ...`}
            onChange={(option) => handleOptionsChange(option.value)}
          />
        )}

        <Button
          onClick={handleResetFilter}
          style={{ padding: "5px 0" }}
          className="btn btn-dark px-2"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default OrderHeader;
