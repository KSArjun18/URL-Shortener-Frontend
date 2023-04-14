import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import ForgotPasswordPage from "./Components/Auth/ForgotPasswordPage";
import Layout from "./Components/url-short/Layout";
import Home from "./Components/url-short/Home";

function App() {
  return (
    <div>
     
          <Routes>
            {/* Authentication Route */}

            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/forgot-password-page/:id/:token"
              element={<ForgotPasswordPage />}
            />

            <Route path="/home" element={<Layout />}>
              <Route index element={<Home/>} />
              </Route>
              </Routes>

    </div>
  );
}

export default App;
