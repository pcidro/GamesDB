import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./Loginform";
import LoginCreate from "./LoginCreate";
import LoginPasswordLost from "./LoginPasswordLost";
import NotFound from "./NotFound.jsx";

const Login = () => {
  return (
    <section>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="criar" element={<LoginCreate />} />
        <Route path="perdeu" element={<LoginPasswordLost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default Login;
