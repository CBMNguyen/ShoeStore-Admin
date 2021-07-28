import { yupResolver } from "@hookform/resolvers/yup";
import CheckBoxField from "custom-fields/CheckBoxField";
import InputField from "custom-fields/InputField";
import SelectField from "custom-fields/SelectField";
import SelectFieldCustom from "custom-fields/SelectFieldCustom";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import {
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Row,
  Spinner,
} from "reactstrap";
import { capitalizeFirstLetter, colourNameToHex } from "utils/common";
import * as yup from "yup";
import FormHeader from "../../../../components/FormHeader";
import "./productaddform.scss";

ProductAddForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  withModel: PropTypes.object.isRequired,
  onFormSubmit: PropTypes.func,
  categoryOptions: PropTypes.array,
  sizeOptions: PropTypes.array,
  colorOptions: PropTypes.array,
};

ProductAddForm.defaultProps = {
  categoryOptions: [],
  sizeOptions: [],
  colorOptions: [],
  onFormSubmit: null,
};

function ProductAddForm(props) {
  const {
    withModel,
    onFormSubmit,
    categoryOptions,
    sizeOptions,
    colorOptions,
    loading,
    error,
  } = props;

  const { closeModel, model } = withModel;

  const defaultValues = !model.data
    ? {
        name: "",
        category: null,
        originalPrice: 100,
        promotionPercent: 0,
        isFreeShip: false,
        size: null,
        color: [
          {
            label: "Black",
            value: "60f04723e2d0bf0698b28978",
            color: "#000000",
          },
        ],
        quantityStock: 1,
        description: "",
        images: null,
      }
    : {
        name: model.data.name,
        category: {
          value: model.data.category._id,
          label: capitalizeFirstLetter(model.data.category.name),
        },
        originalPrice: model.data.originalPrice,
        promotionPercent: model.data.promotionPercent,
        isFreeShip: model.data.isFreeShip,
        size: model.data.size.map((s) => ({ value: s._id, label: s.size })),
        color: model.data.color.map((c) => ({
          label: capitalizeFirstLetter(c.color),
          value: c._id,
          color: colourNameToHex(c.color),
        })),
        quantityStock: model.data.quantityStock,
        description: model.data.description,
        images: null,
      };

  const schema = yup.object().shape({
    name: yup.string().required("This field is require."),
    category: yup.object().required("This field is require.").nullable(),
    originalPrice: yup.number().positive().required("This field is require."),
    promotionPercent: yup
      .number()
      .positive()
      .integer()
      .min(0)
      .max(100)
      .required("This field is require."),
    isFreeShip: yup.bool().default(false),
    size: yup.array().required("This field is require.").nullable(),
    color: yup.array().required("This field is require.").nullable(),
    quantityStock: yup
      .number()
      .positive()
      .integer()
      .min(1)
      .max(99)
      .required("This field is require."),
    images: yup.mixed().required("This file is required"),
    description: yup.string().required("This field is require."),
  });

  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({ defaultValues, resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    if (!onFormSubmit) return;
    await onFormSubmit(data);
  };

  isSubmitSuccessful && !error && closeModel();

  return (
    <div className="ProductAddForm">
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Form Header */}
        <FormHeader closeModel={closeModel} />
        <Row>
          {/*  Product - Input Name */}
          <Col md={6}>
            <InputField
              control={control}
              errors={errors}
              name="name"
              label="Name"
              placeholder="Enter name"
            />
          </Col>

          {/* Product - Select Category */}
          <Col md={6}>
            <SelectField
              setValue={setValue}
              control={control}
              errors={errors}
              name="category"
              label="Category"
              placeholder="Select category ..."
              options={categoryOptions}
            />
          </Col>

          {/* Product - Input Price */}
          <Col md={6}>
            <InputField
              control={control}
              errors={errors}
              name="originalPrice"
              label="Price"
              type="Number"
              placeholder="Enter number"
            />
          </Col>

          {/* Product - Input Promotion Percent */}
          <Col md={6}>
            <InputField
              control={control}
              errors={errors}
              name="promotionPercent"
              label="Promotion Percent"
              type="number"
              placeholder="Enter Promotion Percent"
            />
          </Col>

          {/* Product - CheckBox FreeShip */}
          <Col md={6} className="mt-4">
            <div className="d-flex">
              <CheckBoxField
                setValue={setValue}
                control={control}
                errors={errors}
                name="isFreeShip"
                label="FreeShip"
                type="checkbox"
                className="me-1"
              />

              {/* Product File upload */}
              <FormGroup>
                <Input
                  className="mt-1"
                  {...register("images")}
                  type="file"
                  onChange={(e) => setValue("images", e.target.files)}
                  multiple
                  invalid={!!errors["images"]}
                />
                {errors["images"] && (
                  <FormFeedback>{errors["images"]["message"]}</FormFeedback>
                )}
              </FormGroup>
            </div>
          </Col>

          {/* Product - CheckBox Sizes */}
          <Col md={6}>
            <SelectField
              isMulty={true}
              control={control}
              errors={errors}
              name="size"
              label="Size"
              placeholder="Select size ..."
              options={sizeOptions}
            />
          </Col>

          {/* Product - Input Color */}
          <Col md={6}>
            <SelectFieldCustom
              isMulti={true}
              defaultValue={defaultValues.color}
              setValue={setValue}
              name="color"
              control={control}
              errors={errors}
              label="Color"
              placeholder="Select color ..."
              options={colorOptions}
            />
          </Col>

          {/* Product - Input Quantity */}
          <Col md={6}>
            <InputField
              control={control}
              errors={errors}
              name="quantityStock"
              label="Quantity"
              type="number"
              placeholder="Enter quantity"
            />
          </Col>

          {/* Product - Textarea */}
          <Col md={12}>
            <InputField
              control={control}
              errors={errors}
              className="ProductAddForm__textarea"
              name="description"
              label="Description"
              type="textarea"
            />
          </Col>
        </Row>
        <button
          className="ProductAddForm__btn mt-4"
          disabled={isSubmitting}
          type="submit"
        >
          {loading && (
            <Spinner
              color="light"
              size="md"
              style={{ position: "absolute", right: "1rem", top: "1rem" }}
            >
              {" "}
            </Spinner>
          )}

          {!model.data ? "Submit" : "Update"}
        </button>
      </Form>
    </div>
  );
}

export default ProductAddForm;
