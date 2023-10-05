import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/home/login";
import SignUp from "./pages/signUp/signup";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/signup" Component={SignUp} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
