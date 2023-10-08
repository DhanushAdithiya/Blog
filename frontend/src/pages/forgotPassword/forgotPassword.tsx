import React, { useRef, useState } from "react";
import Error from "../../components/errors/error";

function App() {
  const [noUser, setNoUser] = useState(false);
  const [success, setSuccess] = useState(false);
  const username = useRef<HTMLInputElement>(null);

  async function reequestReset() {
    const response = await fetch("http://127.0.0.1:8000/user/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.current?.value,
      }),
    });

    if (response.status === 200) {
      setSuccess(true);
      setNoUser(false);
    } else if (response.status === 404) {
      setNoUser(true);
    } else {
      console.log("Error Occured");
    }
  }

  return (
    <>
      <h3>Username</h3>
      <input
        ref={username}
        type="text"
        name="username"
        id="username"
        placeholder="Username"
      />
      {noUser && <Error message="User not found" color="red" />}
      {success && <Error message="Check Your Mail" color="green" />}
      <input type="submit" value="Submit" onClick={reequestReset} />
    </>
  );
}

export default App;
