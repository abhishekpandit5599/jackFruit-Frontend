import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [creds, setCreds] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  // API Call for SignUp
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (creds.cpassword === creds.password) {
      try {
        const host = "http://localhost:5000";

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: creds.name,
            email: creds.email,
            password: creds.password,
          }),
        };
        const response = await fetch(
          `${host}/api/auth/createuser`,
          requestOptions
        );
        const responseData = await response.json();

        if (responseData.success) {
          // Save the Auth Token in Local Storage and Redirect
          localStorage.setItem("auth-token", responseData.authtoken);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please Enter the Same password");
    }
  };

  // OnChange function
  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-div-container">
      <div className="login-container">
        <div className="form-div-continer">
          <div className="login-heading">
            <h2>Sign up</h2>
          </div>
          <form className="form-container" onSubmit={handleSubmit}>
            <input
              className="placeicon"
              name="name"
              onChange={onChange}
              value={creds.name}
              type="text"
              placeholder="&#xf007;  Name"
            />
            <input
              className="placeicon"
              name="email"
              onChange={onChange}
              value={creds.email}
              type="text"
              placeholder="&#xf007;  Email"
            />
            <input
              className="placeicon"
              name="password"
              onChange={onChange}
              value={creds.password}
              type="password"
              placeholder="&#xf13e;  Password"
            />
            <input
              className="placeicon"
              name="cpassword"
              onChange={onChange}
              value={creds.cpassword}
              type="password"
              placeholder="&#xf13e; Confirm Password"
            />

            <button className="login-button">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
}
