import React, { useRef, useState } from "react";
import Error from "../../components/errors/error";
import { useNavigate, useParams } from "react-router-dom";

function App() {
  const [match, setMatch] = useState(true);
  const [success, setSuccess] = useState(false);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  async function submitPassword() {
    if (password.current?.value === confirmPassword.current?.value) {
      const response = await fetch(`http://127.0.0.1:8000/user/reset/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password.current?.value,
        }),
      });

      if (response.status === 200) {
        setSuccess(true);
        setMatch(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        // TODO HANDLE THIS ERROR
        console.log("error");
      }
    } else {
      setMatch(false);
    }
  }

  return (
    <>
      <input
        ref={password}
        type="password"
        placeholder="Type New Password"
      ></input>
      <input
        ref={confirmPassword}
        type="password"
        placeholder="Retype Password"
      ></input>
      {!match && <Error message="Passwords do not match" color="red" />}
      {success && (
        <Error
          message="Sucessfully changed password, you will be redirected in 3 seconds"
          color="green"
        />
      )}
      <input type="submit" onClick={submitPassword} value="Submit" />
    </>
  );
}

export default App;
