import PropTypes from "prop-types";
import { useRef, useState } from "react";
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
    setValue("");
  };

  return (
    <div className="TableHeader">
      <div className="TableHeader__add">
        {name !== "User" && (
          <i onClick={handleModelClick} className="zmdi zmdi-plus-circle" />
        )}
      </div>
      <div className="TableHeader__filter">
        <Input
          className="me-2 w-50"
          name="name"
          placeholder="Search Name ..."
          value={value}
          onChange={handleNameChange}
        />
        {options && (
          <Select
            className="me-2"
            {...register(name)}
            options={[{ label: "All", value: "all" }, ...options]}
            placeholder={`Search ${name} ...`}
            onChange={(option) => handleOptionsChange(option.label)}
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

export default TableHeader;
