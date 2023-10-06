import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
// import "home.css";
import Navbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router-dom";

interface DecodedData {
  username: string;
  id: string;
}

function App() {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const loginInfo = localStorage.getItem("loginInfo");
    if (!loginInfo) {
      localStorage.removeItem("loginInfo");
      navigate("/");
    } else {
      const decoded: DecodedData = jwtDecode(loginInfo);
      setUsername(() => decoded.username);
      setId(() => decoded.id);
    }
  }, [navigate]);
  return <h1>Hello {username}</h1>;
}

export default App;
