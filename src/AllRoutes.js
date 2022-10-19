import React from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import Login from "./components/Auth/Login";
import Forgot from "./components/Auth/Forgot";
import Reset from "./components/Auth/Reset";
import Signup from "./components/Auth/Signup";
import Question from "./components/Question";
import AskQuestion from "./components/AskQue/AskQuestion";
import Tags from "./components/Tags/Tags";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/forgot" element={<Forgot />}></Route>
      <Route path="/reset_password/:access_token" element={<Reset />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/ask" element={<AskQuestion />}></Route>
      <Route path="/question/:id" element={<Question />}></Route>
      <Route path="/tags" element={<Tags />} />
    </Routes>
  );
};

export default AllRoutes;
