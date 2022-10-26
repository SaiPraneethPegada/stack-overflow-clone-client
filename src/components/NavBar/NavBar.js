import React, { useEffect, useState } from "react";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { useSelector } from "react-redux";
import icon from "../../assets/icon.png";
import { getQuestions } from "../../features/QuestionSlice";
import { profile } from "../../features/AuthSlice";
import { search } from "../../features/QuestionSlice";

import "./NavBar.css";

export default function NavBar() {
  let [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);

  const logout = () => {
    navigate("/");
    localStorage.clear();
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handlePress = (e) => {
    console.table("Key Pressed:", e.key);
    if (searchTerm === "") {
      if (e.key === "Enter") {
        dispatch(getQuestions());
      }
    }
  };

  // console.log(searchTerm);

  useEffect(() => {
    if (searchTerm !== "") {
      dispatch(search(searchTerm));
    }

    if (token) {
      dispatch(profile());
      const decodeToken = decode(token);
      if (Math.round(+new Date() / 1000) > decodeToken.exp) {
        logout();
        alert("Session Expired! Please Login to continue");
      }
    }
    // eslint-disable-next-line
  }, [token, searchTerm, dispatch]);

  return (
    <header className="navbar sticky-top">
      <div className="items ">
        <Link to="/" className="nav-item nav-type text-nowrap">
          <img src={icon} alt="logo" />
          stack overflow
        </Link>

        <Link to="/" className="nav-type nav-name">
          Products
        </Link>

        <form onKeyDown={handlePress}>
          <input
            type="text"
            placeholder="Search..."
            className="search-box"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        {token ? (
          <>
            <div className="mx-2 d-flex flex-nowrap gap-2 align-items-center">
              <div>
                <Avatar
                  sx={{ bgcolor: red[500] }}
                  aria-label="recipe"
                  onClick={() => handleProfile()}
                  style={{ cursor: "pointer" }}
                >
                  {user?.displayName?.split("")[0]}
                </Avatar>
              </div>
              <div>
                <Button
                  id="buttons"
                  className="ms-2"
                  variant="outlined"
                  size="small"
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="buttons">
            <div>
              <Button
                id="buttons"
                variant="outlined"
                size="small"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </div>
            <div>
              <Button
                id="buttons"
                variant="contained"
                size="small"
                onClick={() => navigate("/signup")}
              >
                Signup
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
