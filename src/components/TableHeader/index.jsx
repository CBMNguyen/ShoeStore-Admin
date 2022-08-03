import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { Button, Input } from "reactstrap";
import "./tableheader.scss";

TableHeader.propTypes = {
  name: PropTypes.string.isRequired,
  onNameChange: PropTypes.func,
  options: PropTypes.array,
  onOptionsChange: PropTypes.func,
  onResetFilter: PropTypes.func,
  showModel: PropTypes.func,
};

TableHeader.defaultProps = {
  showModel: null,
  onNameChange: null,
  onOptionsChange: null,
  options: [],
};

function TableHeader(props) {
  const [value, setValue] = useState("");
  const { register } = useForm();

  const {
    onOptionsChange,
    onNameChange,
    onResetFilter,
    options,
    showModel,
    name,
  } = props;

  const typingTimeoutRef = useRef(null);

  const handleModelClick = () => {
    if (!showModel) return;
    showModel();
  };

  const handleNameChange = (e) => {
    const text = e.target.value;
    setValue(text);

    if (!onNameChange) return;

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      onNameChange(text);
    }, 500);
  };

  const handleOptionsChange = (category) => {
    if (!onOptionsChange) return;
    onOptionsChange(category);
  };

  const handleResetFilter = () => {
    if (!onResetFilter) return;
    onResetFilter();
  };

  return (
    <div className="TableHeader">
      <div className="TableHeader__add">
        <i onClick={handleModelClick} className="zmdi zmdi-plus-circle" />
      </div>
      <div className="TableHeader__filter">
        <Input
          className={classNames("w-50", { "m-auto": !options })}
          name="name"
          placeholder="Search Name ..."
          value={value}
          onChange={handleNameChange}
        />
        {options && (
          <Select
            className="mx-2"
            {...register(name)}
            options={[{ label: "All", value: "all" }, ...options]}
            placeholder={`Search ${name} ...`}
            onChange={(option) => handleOptionsChange(option.label)}
          />
        )}

        <Button onClick={handleResetFilter} className="btn btn-dark p-1 px-2">
          Reset
        </Button>
      </div>
    </div>
  );
}

export default TableHeader;
