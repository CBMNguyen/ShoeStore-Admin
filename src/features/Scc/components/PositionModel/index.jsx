import FormHeader from "components/FormHeader";
import InputField from "custom-fields/InputField";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "reactstrap";
import ActionButton from "../ActionButton";
import "./positionmodel.scss";

PositionModel.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  closeModel: PropTypes.func,
  model: PropTypes.object.isRequired,
};

PositionModel.defaultProps = {
  onSubmit: null,
  closeModel: null,
};

function PositionModel(props) {
  let { closeModel, model, onSubmit, loading, error } = props;
  const { data } = model;

  const defaultValues = !data
    ? {
        position: "",
        salary: 0,
      }
    : { position: data.position, salary: data.salary };

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({ defaultValues });

  const handleCloseModelClick = () => {
    if (!closeModel) return;
    closeModel();
  };

  const onFormSubmit = async (data) => {
    if (!onSubmit) return;
    await onSubmit(data);
  };

  isSubmitSuccessful && !error && closeModel();

  return (
    <div className="ColorSizeModel">
      <Form
        onSubmit={handleSubmit(onFormSubmit)}
        className="ColorSizeModel__main"
      >
        <FormHeader closeModel={closeModel} />

        <InputField
          name="position"
          label="Position"
          control={control}
          errors={errors}
        />

        <InputField
          name="salary"
          control={control}
          type="number"
          label="Salary"
          errors={errors}
        />

        <ActionButton
          onCloseModelClick={handleCloseModelClick}
          model={model}
          isSubmitting={isSubmitting}
          loading={loading}
        />
      </Form>
    </div>
  );
}

export default PositionModel;
