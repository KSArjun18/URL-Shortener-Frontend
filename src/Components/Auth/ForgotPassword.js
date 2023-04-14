import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { env } from "../../config";
import load from "../../asset/loading4.svg";

function ForgotPassword() {
  let navigate = useNavigate();
  let [loading, setloading] = useState(false);
  let [resend, setResend] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      const errors = {};

      if (values.email.length === 0) {
        errors.email = "Enter your email address to reset your password";
      } else if (values.email.search(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        errors.email = "Please provide a valid email address";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        setloading(true);
        let user = await axios.post(`${env.api}/forgot-password`, values);

        if (user.data.statusCode === 200) {
          toast.success(user.data.message);
          setResend(true);
          setloading(false);
        }

         else{
          toast.warn(user.data.message);
          setloading(false);
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
      <h2>Forgot Password</h2>
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


      <button type="submit" className="submit-btn" disabled={!formik.isValid}>
      {loading ? (
              <img src={load} alt="load" className="spinner" />
            ) : resend ? (
              "Resend mail"
            ) : (
              "Send mail"
            )}

          </button>
          <div
          className="mt-3 log"     
        >
          <span  onClick={() => navigate("/")} >Back to login</span>
        </div>
    </form>
    <ToastContainer/>
  </div>
  )
}

export default ForgotPassword