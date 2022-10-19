import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { url } from "../../App";
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

    let res = await axios.post(`${url}/login`, {
      email,
      password,
    });

    console.log(res.data);
    console.log(res.data.message);

    if (res.data.statusCode === 200) {
      window.localStorage.setItem("token", res.data.token);
      navigate("/");
      window.localStorage.setItem("displayName", res.data.user.displayName);
    } else {
      setMessage(res.data.message);
    }
  };
  return (
    <div>
      <form className="login-form">
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
          <div className="form-inputs" style={{ textAlign: "right" }}>
            <Link to="/forgot">Reset Password</Link>
          </div>
          <div className="btn">
            <Button
              id="btn-primary"
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
