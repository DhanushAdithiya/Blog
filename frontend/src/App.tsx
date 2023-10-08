import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import SignUp from "./pages/signUp/signup";
import Home from "./pages/home/home";
import ForgotPassword from "./pages/forgotPassword/forgotPassword";
import ResetPassword from "./pages/forgotPassword/resetPassword";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/signup" Component={SignUp} />
        <Route path="/home" Component={Home} />
        <Route path="/forgot-password" Component={ForgotPassword} />
        <Route path="/reset/:id" Component={ResetPassword} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
