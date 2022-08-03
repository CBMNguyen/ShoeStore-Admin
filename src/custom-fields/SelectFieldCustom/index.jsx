import chroma from "chroma-js";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
import BaseSelect from "react-select";
import { FormFeedback, FormGroup, Label } from "reactstrap";
import FixRequiredSelect from "utils/FixedRequireReactSelect";

const Select = (props) => (
  <FixRequiredSelect
    {...props}
    SelectComponent={BaseSelect}
    options={props.options}
  />
);

const dot = (color = "#ccc") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color:
        data.color === "#ffffff"
          ? "#eee"
          : isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color === "#ffffff" ? "#000000" : data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
  }),
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

SelectFieldCustom.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  control: PropTypes.object.isRequired,
  defaultValue: PropTypes.array.isRequired,
  isMulty: PropTypes.bool,
};

SelectFieldCustom.defaultProps = {
  label: "",
  options: [],
  disabled: false,
  placeholder: "",
  isMulti: false,
};

function SelectFieldCustom(props) {
  const {
    name,
    label,
    options,
    disabled,
    control,
    errors,
    setValue,
    defaultValue,
    placeholder,
    isMulti,
  } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const { value } = field;
        const showError = !!errors[name];
        return (
          <FormGroup className="mb-1 mt-1">
            {label && (
              <Label className="mb-1" for={field.name}>
                {label}
              </Label>
            )}
            <Select
              required={value.length === 0}
              isMulti={isMulti}
              defaultValue={defaultValue}
              className={showError ? "text-dark is-invalid" : ""}
              label={label}
              options={options}
              styles={colourStyles}
              disabled={disabled}
              placeholder={placeholder}
              onChange={(color) => setValue(name, color)}
            />
            {showError && (
              <FormFeedback>{errors[name]["message"]}</FormFeedback>
            )}
          </FormGroup>
        );
      }}
    />
  );
}

export default SelectFieldCustom;
