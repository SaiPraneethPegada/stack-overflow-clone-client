import React from "react";
import { NavLink } from "react-router-dom";
import Globe from "../assets/Globe.svg";

export default function LeftBar() {
  return (
    <div className="left-sidebar">
      <>
        <nav className="sidebar-container ">
          <NavLink
            className="left-components mb-4"
            activeclassname="active"
            to="/"
          >
            Home
          </NavLink>

          <div className="left-components">PUBLIC</div>
          <NavLink className="left-components" activeclassname="active" to="/">
            <img src={Globe} alt="Globe" className="me-1" />
            Questions
          </NavLink>

          <NavLink
            className="left-components ps-4"
            activeclassname="active"
            to="/tags"
          >
            Tags
          </NavLink>

          <NavLink
            className="left-components ps-4"
            activeclassname="active"
            to="/"
          >
            Companies
          </NavLink>
        </nav>
      </>
    </div>
  );
}
