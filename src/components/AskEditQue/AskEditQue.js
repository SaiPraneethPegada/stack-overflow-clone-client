import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { askQuestion, editQue, getById } from "../../features/QuestionSlice";
import "./AskEditQue.css";

export default function AskEditQue() {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState([]);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, questionData } = useSelector((state) => state.questions);

  let body = {
    questionTitle,
    questionBody,
    questionTags,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) {
      <Spinner animation="grow" />;
    }

    if (id) {
      if (!loading) {
        dispatch(editQue({ body, id }));
        navigate("/");
      }
    } else {
      if (!loading) {
        if (questionBody && questionTitle !== "") {
          dispatch(askQuestion({ body }));
          navigate("/");
        } else {
          alert("Fill all fields");
        }
      }
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getById({ id }));
      if (!loading) {
        if (questionData.length !== 0) {
          setQuestionTitle(questionData[0].questionTitle);
          setQuestionBody(questionData[0].questionBody);
          setQuestionTags(questionData[0].questionTags);
        }
      }
    }
    // eslint-disable-next-line
  }, [id, dispatch]);

  return (
    <div className="ask-question ">
      <div className="ask-ques-container">
        <div className="fs-3 pt-3">Ask a public question</div>
        <span>
          {!token ? (
            <div className="text-danger text-center">
              Please login to post a question
            </div>
          ) : (
            <></>
          )}
        </span>
        <form onSubmit={handleSubmit} className="py-4">
          <div className="ask-form-container d-flex flex-column">
            <label htmlFor="ask-ques-title" className="my-2">
              <h4 className="mb-0">Title</h4>
              <p className="m-0 px-0 py-1">
                Be specific and imagine you’re asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                value={questionTitle}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                onChange={(e) => setQuestionTitle(e.target.value)}
              />
            </label>
            <label htmlFor="ask-ques-body" className="my-2">
              <h4>Body</h4>
              <p className="m-0 px-0 py-1">
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                name=""
                id="ask-ques-body"
                value={questionBody}
                cols="30"
                rows="10"
                onChange={(e) => setQuestionBody(e.target.value)}
              ></textarea>
            </label>
            <label htmlFor="ask-ques-tags" className="my-2">
              <h4>Tags</h4>
              <p className="m-0 px-0 py-1">
                Add up to 5 tags to describe what your question is about
              </p>
              <input
                type="text"
                id="ask-ques-tags"
                value={questionTags}
                placeholder="e.g. (nodejs,reactjs,mongodb)"
                onChange={(e) => setQuestionTags(e.target.value.split(","))}
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
