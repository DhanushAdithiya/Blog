import React, { useState } from "react";
import "./signup.css";

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  async function registerUser(e: any) {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/login/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log("data", data);
    if (response.status === 400) {
      // setError(true);
    } else {
      setError(false);
      window.location.href = "/";
    }
  }

  return (
    <div className="container">
      <div className="signup-section">
        <h1>Register</h1>
        <div className="signup-form">
          <form onSubmit={registerUser}>
            <h3>Name</h3>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="First Name"
            />
            <h3>Email</h3>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <h3>Password</h3>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />

            <input className="btn-submit" type="submit" value="Register" />
          </form>
          <h3 className="create-account">
            Already an user?
            <span>
              <a href="/">Sign in </a>
            </span>
          </h3>
        </div>
      </div>
      {/*  <img src="placeholder " alt="" /> */}
    </div>
  );
}

export default App;
