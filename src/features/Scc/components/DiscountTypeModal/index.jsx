import FormHeader from "components/FormHeader";
import { STYLE_MODEL } from "constants/globals";
import InputField from "custom-fields/InputField";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "reactstrap";
import ActionButton from "../ActionButton";
import "./discounttypemodal.scss";

DiscountTypeModal.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func,
  closeModel: PropTypes.func,
  model: PropTypes.object.isRequired,
};

DiscountTypeModal.defaultProps = {
  onSubmit: null,
  closeModel: null,
};

function DiscountTypeModal(props) {
  let { closeModel, model, onSubmit, loading } = props;
  const { data } = model;

  const defaultValues = !data
    ? {
        discountTypeName: "",
      }
    : { discountTypeName: data.discountTypeName };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleCloseModelClick = () => {
    if (!closeModel) return;
    closeModel();
  };

  const onFormSubmit = async (data) => {
    if (!onSubmit) return;
    await onSubmit(data);
  };

  return (
    <div className="ColorSizeModel" style={STYLE_MODEL}>
      <Form
        onSubmit={handleSubmit(onFormSubmit)}
        className="ColorSizeModel__main"
      >
        <FormHeader closeModel={closeModel} />

        <InputField
          name="discountTypeName"
          label="Discount Type"
          control={control}
          errors={errors}
        />

        <ActionButton
          loading={loading}
          onCloseModelClick={handleCloseModelClick}
          model={model}
        />
      </Form>
    </div>
  );
}

export default DiscountTypeModal;
