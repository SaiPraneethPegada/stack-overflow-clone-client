import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../../App.css";
import "./index.css";
import RightSidebar from "../RightBar/RightSidebar";
import { getQuestions } from "../../features/QuestionSlice";
import { Spinner } from "react-bootstrap";
import QuestionTitles from "./QuestionTitles";

export default function Mainpage() {
  let questions = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, questionsData } = useSelector((state) => state.questions);
  const result = useSelector((state) => state.questions.searchTerm);

  // console.log(result);

  if (!loading) {
    questions = questionsData[0];
    // console.log(questions);
  }

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container d-grid w-100 justify-content-center">
        <Spinner animation="grow" />
      </div>
    );
  }

  return (
    <>
      <div id="container">
        <div className="mainbar">
          <div className="headingbar">
            <div className="topheading">
              <div style={{ fontSize: "30px" }}>All Questions</div>
              <div className="ask-btn">
                <Button variant="primary" onClick={() => navigate("/ask")}>
                  Ask a Question
                </Button>
              </div>
            </div>
            <div className="topheading">
              <div>{questions?.length} Questions</div>
              {/* <div className="gap-1 border rounded">
                <Button variant="light" className="">
                  Newest
                </Button>
                <Button variant="light">Unanswered</Button>
              </div> */}
            </div>
          </div>

          <div className="que-container">
            {questions
              ?.filter((que) => {
                // console.log(que.questionTitle.toLowerCase());
                console.log(result);
                if (result === "") {
                  // alert("hi");
                  return que;
                } else if (
                  que.questionTitle.toLowerCase().includes(result.toLowerCase())
                ) {
                  // console.log(que);
                  return que;
                }
                return false;
              })
              ?.map((que, index) => (
                <QuestionTitles questions={que} index={index} key={index} />
              ))}
          </div>
        </div>
        <div className="sidebar">
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
