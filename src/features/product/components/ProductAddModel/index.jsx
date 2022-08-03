import { yupResolver } from "@hookform/resolvers/yup";
import SelectSizeAndQuantityList from "components/SelectSizeAndQuantityList";
import { STYLE_MODEL } from "constants/globals";
import CheckBoxField from "custom-fields/CheckBoxField";
import InputField from "custom-fields/InputField";
import SelectField from "custom-fields/SelectField";
import SelectFieldCustom from "custom-fields/SelectFieldCustom";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { Col, Form, Row, Spinner } from "reactstrap";
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
    loading,
    withModel,
    categoryOptions,
    sizeOptions,
    colorOptions,
    onFormSubmit,
  } = props;

  const { closeModel, model } = withModel;

  const defaultValues = !model.data
    ? {
        name: "",
        category: null,
        originalPrice: 100,
        promotionPercent: 0,
        isFreeShip: false,
        color: [
          {
            label: "Black",
            value: "60f04723e2d0bf0698b28978",
            color: "#000000",
          },
        ],
        description: "",
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
        color: model.data.productDetail.map(({ color }) => ({
          label: capitalizeFirstLetter(color.color),
          value: color._id,
          color: colourNameToHex(color.color),
        })),
        description: model.data.description,
      };

  const schema = yup.object().shape({
    name: yup.string().required("This field is required."),
    category: yup.object().required("This field is required.").nullable(),
    originalPrice: yup.number().positive().required("This field is required."),
    promotionPercent: yup
      .number()
      .positive()
      .integer()
      .min(0)
      .max(100)
      .required("This field is required."),
    isFreeShip: yup.bool().default(false),

    color: yup.array().required("This field is required.").nullable(),
    description: yup.string().required("This field is required."),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm({ defaultValues, resolver: yupResolver(schema) });

  const colors = watch("color");

  const [productDetail, setProductDetail] = useState([]);
  const handleSaveSelectSizeAndQuantityList = (
    color,
    images,
    sizeAndQuantity
  ) => {
    const index = productDetail.findIndex((item) => item.color === color);
    const newProductDetail = { color, images, sizeAndQuantity };
    if (index < 0) {
      setProductDetail([...productDetail, newProductDetail]);
    } else {
      const updatedProductDetail = [...productDetail];
      updatedProductDetail[index] = { color, images, sizeAndQuantity };
      setProductDetail(updatedProductDetail);
    }
  };

  const handleClearSelectSizeAndQuantityList = (color) => {
    setProductDetail(productDetail.filter((item) => item.color !== color));
  };

  const onSubmit = (data) => {
    if (!onFormSubmit) return;
    data.productDetail = productDetail;
    onFormSubmit(data);
  };

  return (
    <div className="ProductAddForm" style={STYLE_MODEL}>
      (
      <Form className="ProductAddForm__form" onSubmit={handleSubmit(onSubmit)}>
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
        </Row>

        <Row>
          {/* Product - Input Price */}
          <Col md={6}>
            <InputField
              control={control}
              errors={errors}
              name="originalPrice"
              label="Price"
              type="number"
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
              min={1}
            />
          </Col>
        </Row>

        <Row>
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
            </div>
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
        </Row>

        <div className="ProductAddForm__detail">
          {colors.map((color, index) => (
            <div key={index}>
              {/* Handle Select Size And Quantity */}
              <SelectSizeAndQuantityList
                data={
                  model.data && model.data.productDetail[index]
                    ? model.data.productDetail[index].sizeAndQuantity
                    : null
                }
                currentImages={
                  model.data && model.data.productDetail[index]
                    ? model.data.productDetail[index].images
                    : null
                }
                color={color}
                onSaveSelectSizeAndQuantityList={
                  handleSaveSelectSizeAndQuantityList
                }
                onClearSelectSizeAndQuantityList={
                  handleClearSelectSizeAndQuantityList
                }
                sizeOptions={sizeOptions}
              />
            </div>
          ))}
        </div>

        <Row>
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
          disabled={loading}
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
      )
    </div>
  );
}

export default ProductAddForm;
