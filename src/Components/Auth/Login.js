import React, { useState } from "react";
import "./Login.css";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { env } from "../../config";
import Swal from 'sweetalert2';
import load from "../../asset/loading4.svg";




function Login() {
 

  let navigate = useNavigate();

  let [loading, setloading] = useState(false);




  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      if (values.email.length === 0) {
        errors.email = "Enter your email address";
      } else if (values.email.search(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        errors.email = "Please provide a valid email address";
      }
      if (values.password.length === 0) {
        errors.password = "Enter your password";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        setloading(true);
        let value = await axios.post(`${env.api}/login`, values);
        const { data } = value;
        const {message, statusCode, token, id} = data;
        setloading(false);
        if (statusCode === 201) {
          window.localStorage.setItem("token", token);
          window.localStorage.setItem("id", id);
          Swal.fire(
            "Login Successfull",
            "Your session expiry in 5 minutes!",
            'success'
          )
          navigate("/home");
        }
        else{
          toast.warn(message);
         }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (

<div className="login-wrapper">
    <form  className="form"  onSubmit={(values) => {
            formik.handleSubmit(values);
          }}>
     
      <h2>Login</h2>
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
      <div className=" forgot ">
            <span onClick={() => navigate("/forgot-password")}>
              Forgot Password ?
            </span>
          </div>
      <button type="submit" className="submit-btn" disabled={!formik.isValid}>
           
            
            {loading ? (
            <img src={load} alt="load" className="spinner" />
          ) : (
            " Login "
          )}

          </button>
      <div className="mt-3 new_user">
            <span>
              Dont 't have an account? {" "}
              <span
                className="sign_color"
                onClick={() => navigate("/register")}
              >
                 Sign up now
              </span>
            </span>
          </div>
    </form>
    

    <div id="forgot-pw">
      <form className="form">
        <a href="!#" className="close">&times;</a>
        <h2>Reset Password</h2>
        <div className="input-group">
          <input type="email" name="email" id="email" required/>
          <label for="email">Email</label>
        </div>
        <input type="submit" value="Submit" className="submit-btn"/>
      </form>
    </div>
    <ToastContainer/>
  </div>
  
  );
}

export default Login;
