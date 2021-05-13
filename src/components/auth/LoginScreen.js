import React from "react";
import { useDispatch } from "react-redux";
import { startLogin, startRegister } from "../../actions/auth";

import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { purple } from "@ant-design/colors";

import "./login.css";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";

export const LoginScreen = () => {
  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();

  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: "",
    lPassword: ""
  });

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rName: "",
    rEmail: "",
    rPassword1: "",
    rPassword2: ""
  });

  const { lEmail, lPassword } = formLoginValues;
  const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(startLogin(lEmail, lPassword));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(rPassword1, rPassword2);
    if (rPassword1 !== rPassword2) {
      return Swal.fire("Error", "Las contraseñas deben ser iguales", "error");
    }

    dispatch(startRegister(rName, rEmail, rPassword1));
  };

  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    // <div className="container login-container">
    //   <div className="row">
    //     <div className="col-md-6 login-form-1">
    //       <h3>Ingreso</h3>
    //       <form className="needs-validation" onSubmit={handleLogin} noValidate>
    //         <div className="input-group has-validation">
    //           <span className="input-group-text" id="inputGroupPrepend">
    //             @
    //           </span>
    //           <input
    //             type="email"
    //             className="form-control"
    //             placeholder="Email"
    //             name="lEmail"
    //             value={lEmail}
    //             onChange={handleLoginInputChange}
    //             required="required"
    //           />
    //           <div className="invalid-feedback">
    //             Ingrese el nombre de usuario
    //           </div>
    //         </div>
    //         <div className="form-group mt-2">
    //           <input
    //             type="password"
    //             className="form-control"
    //             placeholder="Contraseña"
    //             name="lPassword"
    //             value={lPassword}
    //             onChange={handleLoginInputChange}
    //             required="required"
    //             minLength="10"
    //           />
    //         </div>
    //         <div className="form-group">
    //           <input type="submit" className="btnSubmit" value="Login" />
    //         </div>
    //       </form>
    //     </div>

    //     <div className="col-md-6 login-form-2">
    //       <h3>Registro</h3>
    //       <form
    //         onSubmit={handleRegister}
    //         className="needs-validation"
    //         noValidate
    //       >
    //         <div className="form-group">
    //           <input
    //             type="text"
    //             className="form-control"
    //             placeholder="Nombre"
    //             name="rName"
    //             value={rName}
    //             onChange={handleRegisterInputChange}
    //             required="required"
    //           />
    //         </div>
    //         <div className="form-group">
    //           <input
    //             type="email"
    //             className="form-control"
    //             placeholder="Email"
    //             name="rEmail"
    //             value={rEmail}
    //             onChange={handleRegisterInputChange}
    //             required="required"
    //           />
    //         </div>
    //         <div className="form-group">
    //           <input
    //             type="password"
    //             className="form-control"
    //             placeholder="Contraseña"
    //             name="rPassword1"
    //             value={rPassword1}
    //             onChange={handleRegisterInputChange}
    //             required="required"
    //             min="10"
    //           />
    //         </div>

    //         <div className="form-group">
    //           <input
    //             type="password"
    //             className="form-control"
    //             placeholder="Repita la contraseña"
    //             name="rPassword2"
    //             value={rPassword2}
    //             onChange={handleRegisterInputChange}
    //             required="required"
    //             min="10"
    //           />
    //         </div>

    //         <div className="form-group">
    //           <input type="submit" className="btnSubmit" value="Crear cuenta" />
    //         </div>
    //       </form>
    //     </div>

    <>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="username"
          rules={[
            {
              required: true,
              message: "Ingrese el email"
            }
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            {
              required: true,
              message: "Ingrese la contraseña"
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
    // </div>
  );
};
