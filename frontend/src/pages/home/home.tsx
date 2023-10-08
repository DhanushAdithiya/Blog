import React, { useCallback, useEffect, useState } from "react";
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

  const signOut = useCallback(() => {
    localStorage.removeItem("loginInfo");
    navigate("/");
  }, [navigate]);

  function decodeData(data: string) {
    const decoded: DecodedData = jwtDecode(data);
    setUsername(decoded.username);
    setId(decoded.id);
  }

  useEffect(() => {
    const loginInfo = localStorage.getItem("loginInfo");
    if (!loginInfo) {
      const tempLoginInfo = sessionStorage.getItem("loginInfo");
      if (!tempLoginInfo) {
        signOut();
      } else {
        decodeData(tempLoginInfo);
      }
    } else {
      decodeData(loginInfo);
    }
  }, [navigate, signOut]);

  return (
    <>
      <h1>Hello {username}</h1>
      <button onClick={signOut}>Signout</button>
    </>
  );
}

export default App;
