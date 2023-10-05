import React, { useState } from "react";
import "./login.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  async function loginUser(e: any) {
    e.preventDefault();

    setError(false);

    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      console.log("confirm");
      console.log(data);
    } else {
      console.log("errpr");
    }
  }

  return (
    <>
      <div className="container">
        <div className="login-section">
          <div className="login-text">
            <h1>Welcome back!</h1>
            <h3>Please log back into the app</h3>
          </div>
          <div className="login-info">
            <form className="login-form" onSubmit={loginUser} action="/">
              <h3>Username</h3>
              <input
                className="form__field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                name="username"
                id="username"
                required
              />
              <h3>Password</h3>

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />

              <input className="btn-submit" type="submit" value="Login" />
            </form>
            <h3 className="create-account">
              Don't have an account?{" "}
              <span>
                <a className="sign-up-anchor" href="/signup">
                  Sign Up{" "}
                </a>
              </span>
            </h3>
          </div>
        </div>
        {/* <img src="img1.jpg" alt="a" /> */}
      </div>
    </>
  );
}

export default App;
