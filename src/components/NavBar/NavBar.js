import React from "react";
import { Link, useNavigate } from "react-router-dom";
import icon from "../../assets/icon.png";
import Button from "@mui/material/Button";

import "./NavBar.css";

export default function NavBar() {
  const navigate = useNavigate();

  let token = localStorage.getItem("token");
  console.log(token);

  const logout = () => {
    navigate("/");
    localStorage.clear();
  };

  return (
    <header className="navbar">
      <div className="items">
        <Link to="/" className="nav-item nav-type">
          <img src={icon} alt="logo" />
          stack overflow
        </Link>
        <Link to="/" className="nav-type nav-name">
          About
        </Link>
        <Link to="/" className="nav-type nav-name">
          Products
        </Link>
        <Link to="/" className="nav-type nav-name">
          For Teams
        </Link>
        <form>
          <input type="text" placeholder="Search..." className="search-box" />
        </form>
        {token ? (
          <>
            <Button
              id="buttons"
              variant="outlined"
              size="small"
              onClick={() => logout()}>
              Logout
            </Button>
          </>
        ) : (
          <div className="buttons">
            <div>
              <Button
                id="buttons"
                variant="outlined"
                size="small"
                onClick={() => navigate("/login")}>
                Login
              </Button>
            </div>
            <div>
              <Button
                id="buttons"
                variant="contained"
                size="small"
                onClick={() => navigate("/signup")}>
                Signup
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
