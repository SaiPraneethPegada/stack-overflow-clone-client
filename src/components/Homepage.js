import React from "react";
import LeftBar from "./LeftBar";
import Mainpage from "./Mainpage";

import "../App.css";

export default function Homepage() {
  return (
    <>
      <div className="home-container container">
        <LeftBar />
        <Mainpage />
      </div>
    </>
  );
}
