import React, { useCallback, useEffect, useRef, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Message from "../../components/errors/error";
import jwtDecode from "jwt-decode";

interface decodedData {
  username: string;
  password: string;
}

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const remember = useRef<HTMLInputElement>(null);

  const loginUser = useCallback(
    async (e?: React.FormEvent<EventTarget>) => {
      e?.preventDefault(); //Optional Chaining incase the the funciton is called from a FormEvent

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
        if (remember.current?.checked) {
          localStorage.setItem("loginInfo", data.encryptedCred);
        } else {
          sessionStorage.setItem("loginInfo", data.encryptedCred);
        }
        window.location.href = "/home";
      } else {
        setError(true);
      }
    },
    [password, username]
  );

  useEffect(() => {
    const token = localStorage.getItem("loginInfo");
    if (token) {
      const decoded: decodedData = jwtDecode(token);
      setPassword(decoded.password);
      setUsername(decoded.username);
      loginUser();
    } else {
      localStorage.removeItem("loginInfo");
    }
  }, [navigate, loginUser]);

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
              <div>
                <a href="/forgot-password">Forgot Password?</a>
                <label htmlFor="rememberMeCheckbox">
                  <input
                    ref={remember}
                    type="checkbox"
                    id="rememberMeCheckbox"
                  />
                  Remember me
                </label>
              </div>
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
        <img
          src="https://cdn.dribbble.com/userupload/10625304/file/original-21c9188c7ecd9aa544d5a9e72c51498e.png?resize=1024x766"
          alt="a"
        />
      </div>
    </>
  );
}

export default App;
