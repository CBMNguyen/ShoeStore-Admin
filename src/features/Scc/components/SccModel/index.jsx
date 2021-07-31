import { yupResolver } from "@hookform/resolvers/yup";
import FormHeader from "components/FormHeader";
import { STYLE_MODEL } from "constants/globals";
import InputField from "custom-fields/InputField";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "reactstrap";
import { capitalizeFirstLetter } from "utils/common";
import * as yup from "yup";
import ActionButton from "../ActionButton";
import "./sccmodel.scss";

SccModel.propTypes = {
  loading: PropTypes.bool.isRequired,
  addModel: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

function SccModel(props) {
  let { addModel, name, onSubmit, loading } = props;
  if (name === "category") name = "name";

  let defaultValues = {};
  name === "size" ? (defaultValues[name] = 38) : (defaultValues[name] = "");

  if (addModel.model.data) defaultValues[name] = addModel.model.data[name];

  const schema = yup.object().shape({
    [name]:
      name !== "size"
        ? yup.string().required("This field is require.")
        : yup
            .number()
            .positive("Size must be positive number")
            .integer("Size must be integer number")
            .required("This field is require."),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(schema) });

  const handleCloseModelClick = () => {
    if (!addModel.closeModel) return;
    addModel.closeModel();
  };

  const onFormSubmit = (data) => {
    if (!onSubmit) return;
    onSubmit(data);
  };

  return (
    <div className="ColorSizeModel" style={STYLE_MODEL}>
      <Form
        onSubmit={handleSubmit(onFormSubmit)}
        className="ColorSizeModel__main"
      >
        <FormHeader closeModel={addModel.closeModel} />
        <InputField
          name={name}
          type={name === "size" ? "number" : "text"}
          label={capitalizeFirstLetter(name === "name" ? "category" : name)}
          control={control}
          errors={errors}
          placeholder={
            name === "color"
              ? "Please check HTML color name before enter ..."
              : ""
          }
        />

        <ActionButton
          model={addModel.model}
          loading={loading}
          onCloseModelClick={handleCloseModelClick}
        />
      </Form>
    </div>
  );
}

export default SccModel;
