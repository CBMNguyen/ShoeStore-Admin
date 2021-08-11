import { yupResolver } from "@hookform/resolvers/yup";
import FormHeader from "components/FormHeader";
import { GENDER_OPTIONS, STYLE_MODEL } from "constants/globals";
import DateInputField from "custom-fields/DateInputField";
import InputField from "custom-fields/InputField";
import SelectField from "custom-fields/SelectField";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { capitalizeFirstLetter } from "utils/common";
import * as yup from "yup";
import "./employeeaddmodel.scss";

EmployeeAddModel.propTypes = {
  positionOptions: PropTypes.array,
  onSubmit: PropTypes.func,
  model: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

EmployeeAddModel.defaultProps = {
  positionOptions: [],
  onSubmit: null,
};

function EmployeeAddModel(props) {
  const { model, closeModel, onSubmit, positionOptions, loading } = props;
  const defaultValues = !model.data
    ? {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        gender: "",
        birthdate: "",
        position: "",
        image: null,
        address: "",
      }
    : {
        firstname: model.data.firstname,
        lastname: model.data.lastname,
        email: model.data.email,
        phone: model.data.phone,
        gender: {
          label: capitalizeFirstLetter(model.data.gender),
          value: model.data.gender,
        },
        birthdate: new Date(model.data.birthdate),
        position: {
          label: capitalizeFirstLetter(model.data.position["position"]),
          value: model.data.position["_id"],
        },
        image: model.data.image,
        address: model.data.address,
      };

  const schema = yup.object().shape({
    firstname: yup.string().required("This field is require."),
    lastname: yup.string().required("This field is require."),
    email: yup
      .string()
      .matches(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        "Please enter correct email!"
      )
      .required("This field is require."),
    phone: yup
      .string()
      .matches(/^0[0-9]{9}$/, "Please enter correct phone number!")
      .required("this field is require."),
    gender: yup.object().required("This field is require.").nullable(),
    birthdate: yup.date().required("This field is require."),
    position: yup.object().required("This field is require.").nullable(),
    image: yup.mixed().required("This file is required"),
    address: yup.string().required("This field is require."),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    register,
  } = useForm({ defaultValues, resolver: yupResolver(schema) });

  const onFormSubmit = async (data) => {
    if (!onSubmit) return;
    await onSubmit(data);
  };

  return (
    <div className="EmployeeAddModel" style={STYLE_MODEL}>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <FormHeader closeModel={closeModel} />
        <Row>
          <Col md={6}>
            <InputField
              name="firstname"
              control={control}
              label="First Name"
              errors={errors}
            />
          </Col>

          <Col md={6}>
            <InputField
              name="lastname"
              control={control}
              label="Last Name"
              errors={errors}
            />
          </Col>

          <Col md={6}>
            <InputField
              name="email"
              control={control}
              label="Email"
              errors={errors}
              type="email"
            />
          </Col>

          <Col md={6}>
            <InputField
              name="phone"
              control={control}
              label="Phone"
              errors={errors}
            />
          </Col>

          <Col md={6}>
            <SelectField
              name="gender"
              control={control}
              label="Gender"
              errors={errors}
              options={GENDER_OPTIONS}
            />
          </Col>

          <Col md={6}>
            <DateInputField
              name="birthdate"
              control={control}
              setValue={setValue}
              label="Date of Birth"
              placeholder="01/12/2000"
              errors={errors}
            />
          </Col>

          <Col md={6}>
            <SelectField
              name="position"
              control={control}
              label="Position"
              errors={errors}
              options={positionOptions}
            />
          </Col>

          <Col md={6}>
            <FormGroup className="mt-1">
              <Label className="d-block">Avatar</Label>
              <Input
                className="mt-1"
                {...register("image")}
                type="file"
                onChange={(e) => setValue("image", e.target.files[0])}
                invalid={!!errors["image"]}
              />
              {errors["image"] && (
                <FormFeedback>{errors["image"]["message"]}</FormFeedback>
              )}
            </FormGroup>
          </Col>

          <Col>
            <InputField
              name="address"
              control={control}
              label="Address"
              errors={errors}
            />
          </Col>
        </Row>
        <button
          className="EmployeeAddModel__btn mt-4"
          type="submit"
          disabled={loading}
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
          {model.data ? "Update" : "Submit"}
        </button>
      </Form>
    </div>
  );
}

export default EmployeeAddModel;
