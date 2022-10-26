import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../App";
import Button from "@mui/material/Button";
import "./login.css";
import icon from "../../assets/icon.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  let handleSubmit = async () => {
    console.log(email, password);
    
    let res = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    if (res.data.statusCode === 200) {
      window.localStorage.setItem("token", res.data.token);
      window.localStorage.setItem("displayName", res.data.user.displayName);
      window.localStorage.setItem("userId", res.data.user._id);
      navigate("/");
    } else {
      setMessage(res.data.message);
    }
  };
  return (
    <div>
      <form className="login-form d-flex flex-column align-items-center my-5 mx-0">
        <img src={icon} alt="logo" />
        <div>
          <div className="form-inputs">
            <label htmlFor="email">Email </label>
            <br />
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="password">Password </label>
            <br />
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-inputs text-end">
            <Link to="/forgot">Reset Password</Link>
          </div>
          <div className="d-flex justify-content-center px-3">
            <Button
              className="w-100 h-50"
              variant="contained"
              size="small"
              onClick={() => handleSubmit()}
            >
              Log in
            </Button>
          </div>
        </div>
        <span>
          {message ? (
            <div style={{ color: "red", textAlign: "center" }}>{message}</div>
          ) : (
            <></>
          )}
        </span>
      </form>
    </div>
  );
}
