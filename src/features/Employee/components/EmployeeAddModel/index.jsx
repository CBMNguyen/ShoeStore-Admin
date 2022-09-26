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
  Table,
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
  const { model, closeModel, onSubmit, positionOptions, loading, roles } =
    props;
  const defaultValues = !model.data
    ? {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        birthdate: "",
        position: "",
        image: null,
        address: "",
        roles: [],
      }
    : {
        firstname: model.data.firstname,
        lastname: model.data.lastname,
        email: model.data.email,
        password: model.data.password,
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
        roles: model.data.roles || [],
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
    password: yup
      .string()
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}?/,
        "Password must be at least 8 characters with one uppercase letter, one lowercase letter, and one special character"
      )
      .required("This field is require."),
    phone: yup
      .string()
      .required("this field is require.")
      .matches(/^0[0-9]{9}$/, "Please enter correct phone number!"),
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
          <Col md={4}>
            <InputField
              name="firstname"
              control={control}
              label="First Name"
              errors={errors}
            />
          </Col>

          <Col md={4}>
            <InputField
              name="lastname"
              control={control}
              label="Last Name"
              errors={errors}
            />
          </Col>

          <Col md={4}>
            <SelectField
              name="gender"
              control={control}
              label="Gender"
              errors={errors}
              options={GENDER_OPTIONS}
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
              name="password"
              control={control}
              label="Password"
              errors={errors}
              type="password"
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

          <Col md={12}>
            <InputField
              name="address"
              control={control}
              label="Address"
              errors={errors}
            />
          </Col>

          <Col>
            <Table className="mt-3">
              <thead>
                <tr>
                  {roles.map(({ role }) => (
                    <th className="text-center" key={role}>
                      <code className="fs-6">
                        {capitalizeFirstLetter(role)}
                      </code>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {roles.map(({ _id, role }, index) => (
                    <td className="text-center" key={role}>
                      <input
                        style={{ cursor: "pointer" }}
                        className="form-check-input mb-3"
                        {...register(`roles.${index}]`)}
                        value={_id}
                        type="checkbox"
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </Table>
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
