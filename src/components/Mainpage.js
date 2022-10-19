import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "../App.css";
import "./Mainpage.css";
import Questions from "./Questions";
import RightSidebar from "./RightSidebar/RightSidebar";
import { useGetAllQuestionsQuery } from "../services/Question";

export default function Mainpage() {
  const navigate = useNavigate();
  let questions = [];

  const { data, isError, isLoading, isSuccess, error } =
    useGetAllQuestionsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isSuccess) {
    questions.push(data.allQuestions);
  }
  if (isError) return <div> Error Occured {error.error}</div>;

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
              <div>{questions[0]?.length} Questions</div>
              <div>
                <ButtonGroup aria-label="Buttons" className="border">
                  <Button variant="light">Newest</Button>
                  <Button variant="light">Unanswered</Button>
                </ButtonGroup>
              </div>
            </div>
          </div>

          <div className="que-container">
            {questions[0]?.map((que, index) => (
              <Questions questions={que} index={index} key={index} />
            ))}
          </div>
        </div>
        <RightSidebar />
      </div>
    </>
  );
}
