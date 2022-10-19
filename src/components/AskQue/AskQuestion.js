import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostQuestionMutation } from "../../services/Question";
import "./AskQuestion.css";

export default function AskQuestion() {
  let [questionTitle, setQuestionTitle] = useState("");
  let [questionBody, setQuestionBody] = useState("");
  let [questionTags, setQuestionTags] = useState([]);
  const [body, responseInfo] = usePostQuestionMutation();
  let message = "";
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let response = {
    questionTitle,
    questionBody,
    questionTags,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(response);
    body(response);
  };

  if (responseInfo.isSuccess) {
    if (responseInfo.data.statusCode === 200) {
      alert(responseInfo.data.message);
      navigate("/");
    } else {
      message = responseInfo.data.error.message;
    }
  }

  return (
    <div className="ask-question ">
      <div className="ask-ques-container">
        <div className="fs-3 pt-5">Ask a public question</div>
        <span>
          {!token ? (
            <div style={{ color: "red", textAlign: "center" }}>
              Please login to post a question
            </div>
          ) : (
            <></>
          )}
        </span>
        <span>
          {message ? (
            <div style={{ color: "red", textAlign: "center" }}>{message}</div>
          ) : (
            <></>
          )}
        </span>
        <form onSubmit={handleSubmit} className="py-5">
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title" className="my-2">
              <h4>Title</h4>
              <p>
                Be specific and imagine you’re asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                onChange={(e) => setQuestionTitle(e.target.value)}
              />
            </label>
            <label htmlFor="ask-ques-body" className="my-2">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                name=""
                id="ask-ques-body"
                cols="30"
                rows="10"
                onChange={(e) => setQuestionBody(e.target.value)}
              ></textarea>
            </label>
            <label htmlFor="ask-ques-tags" className="my-2">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type="text"
                id="ask-ques-tags"
                placeholder="e.g. (nodejs reactjs mongodb)"
                onChange={(e) => setQuestionTags(e.target.value.split(" "))}
              />
            </label>
          </div>
          {token ? (
            <input
              type="submit"
              value="Review your question"
              className="review-btn"
            />
          ) : (
            <></>
          )}
        </form>
      </div>
    </div>
  );
}
