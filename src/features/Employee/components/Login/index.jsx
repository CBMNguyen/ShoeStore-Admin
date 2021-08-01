import InputField from "custom-fields/InputField";
import React from "react";
import { Form, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import "./login.scss";
import { Button } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { showToastError, showToastSuccess } from "utils/common";
import { employeeLogin } from "features/Employee/employeeSlice";
import { useDispatch, useSelector } from "react-redux";

const defaultValues = { email: "", password: "" };

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      "Please enter correct email!"
    )
    .required("This field is require."),
  password: yup.string().required("This field is require."),
});

function Login(props) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.employee);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(schema) });
  const onSubmit = async (data) => {
    try {
      await showToastSuccess(dispatch(employeeLogin(data)));
    } catch (error) {
      showToastError(error);
    }
  };

  return (
    <div className="Login">
      <Form className="Login__form" onSubmit={handleSubmit(onSubmit)}>
        <header>Login</header>
        <InputField
          control={control}
          name="email"
          label="Email"
          type="email"
          placeholder="Your email ..."
          errors={errors}
        />
        <InputField
          control={control}
          name="password"
          label="Password"
          type="password"
          placeholder="Your password ..."
          errors={errors}
        />
        <Button
          className="d-block w-50 m-auto mt-4 rounded"
          color="primary"
          disabled={loading}
          style={{ position: "relative" }}
        >
          {loading && (
            <Spinner
              color="light"
              size="sm"
              style={{ position: "absolute", right: "1rem", top: "0.6rem" }}
            >
              {" "}
            </Spinner>
          )}
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
