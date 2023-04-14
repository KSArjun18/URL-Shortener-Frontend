import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { env } from "../../config";


function Register() {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      conformPassword: "",
    },
    validate: (values) => {
      const errors = {};

      if (values.name.length === 0) {
        errors.name = "Enter your name";
      }
      if (values.email.length === 0) {
        errors.email = "Enter your email address";
      } else if (values.email.search(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        errors.email = "Please provide a valid email address";
      }



      if (values.password.length === 0) {
        errors.password = "Enter your passowrd";
      } else if (values.password.search(/[a-z]/i) < 0) {
        errors.password = "Your password must contain at least one letter";
      } else if (values.password.search(/[0-9]/) < 0) {
        errors.password = "Your password must contain at least one digit";
      } else if (values.password.length < 8) {
        errors.password = "Your password must be at least 8 characters";
      }
      if (values.conformPassword !== values.password) {
        errors.conformPassword = "Conform password does not match";
      } else if (values.conformPassword.length === 0) {
        errors.conformPassword = "Enter your conform password";
      }
      return errors;
    },

    onSubmit: async (values) => {
      try {
        delete values.conformPassword;

        console.log(values);

        let user = await axios.post(`${env.api}/register`, values);
        const { data } = user;
        const { message, statusCode } = data;
        if (statusCode === 201) {
            navigate("/");
        }else{

          toast.warn(message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
    <div className="login-wrapper">
    <form  className="form"  onSubmit={(values) => {
            formik.handleSubmit(values);
          }}>
      <h2>Sign Up</h2>
      <div className="input-group">
        <input type="text"  id="name" required 
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name="name"
        />
        <label for="name">Name</label>
       
      </div>
      {formik.touched.name && formik.errors.name ? (
              <div className="error"> {formik.errors.name}</div>
            ) : null}
      <div className="input-group">
        <input type="text"  id="email" required 
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name="email"
        />
        <label for="email">Email</label>
       
      </div>
      {formik.touched.email && formik.errors.email ? (
              <div className="error"> {formik.errors.email}</div>
            ) : null} 
      <div className="input-group">
        <input type="password"  id="password" required 
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name="password"
        />
        <label for="password">Password</label> 
      </div>
      {formik.touched.password && formik.errors.password ? (
              <div className="error"> {formik.errors.password}</div>
            ) : null}

<div className="input-group">
        <input type="password"  id="conformPassword" required 
        value={formik.values.conformPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name="conformPassword"
        />
        <label for="password">Conform Password</label> 
      </div>
      {formik.touched.conformPassword && formik.errors.conformPassword ? (
              <div className="error"> {formik.errors.conformPassword}</div>
            ) : null}
            
      <button type="submit" className="submit-btn" disabled={!formik.isValid}>
            
                Register

          </button>
          <div className="mt-3 new_user">
            <span>
              Already have an account?{" "}
              <span className="sign_color" onClick={() => navigate("/")}>
                Sign in now
              </span>
            </span>
          </div>

    </form>
    

    <ToastContainer/>
  </div>

    </>
  );
}

export default Register;
