import React, { useEffect, useState } from "react";
import "./login.css";
import Message from "../../components/errors/error";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Get data if already present in local storage to log in the user automatically

  async function loginUser(e: any) {
    e.preventDefault();

    setError(false);
    setSuccess(false);

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
      setError(false);
      setSuccess(true);
      console.log(data);
      localStorage.setItem("loginInfo", data.encryptedCred);
      window.location.href = "/home";
    } else {
      setError(true);
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
              {error && (
                <Message
                  color="red"
                  message={"Credentials do not belong to an account"}
                />
              )}
              {success && (
                <Message
                  color="green"
                  message={
                    "Login Sucessfull. please wait while we redirect you"
                  }
                />
              )}

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
