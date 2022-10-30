import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { getById } from "../../features/QuestionSlice";

import { increment } from "../../features/QuestionSlice";
import "./AskEditQue.css";
import axios from "axios";
import { API_URL } from "../../App";

export default function AskEditQue() {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState([]);
  const [relevant, setRelevant] = useState([]);
  const [views, setViews] = useState(0);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, questionData } = useSelector((state) => state.questions);
  const quantity = useSelector((state) => state.questions.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) {
      <Spinner animation="grow" />;
    }

    if (id) {
      if (!loading) {
        let res = await axios.put(
          `${API_URL}/questions/edit/${id}`,
          {
            questionTitle,
            questionBody,
            questionTags,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.statusCode === 200) {
          alert(res.data.message);
          navigate("/");
        } else {
          alert(res.data.message);
        }
      }
    } else {
      if (!loading) {
        if (questionBody && questionTitle !== "") {
          let res = await axios.post(
            `${API_URL}/questions/postQuestion`,
            {
              questionTitle,
              questionBody,
              questionTags,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res.data.statusCode === 200) {
            alert(res.data.message);
            navigate("/");
          } else {
            alert(res.data.message);
            setRelevant(res.data.question[0]);
          }
        } else {
          alert("Fill all fields");
        }
      }
    }
  };

  const handleViews = () => {
    dispatch(increment(relevant));
  };

  // console.log(relevant);
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

    quantity.map((item) => {
      if (item._id === relevant._id) {
        return setViews(item.count);
      }
      return false;
    });
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
                required
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
                required
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

        {relevant?.questionTitle === questionTitle ||
        relevant?.questionBody === questionBody ? (
          <div className="shadow rounded que-details py-5">
            <div style={{ fontSize: "13px" }} className="m-2 text-end pe-2">
              <div className="side-details m-1">
                {Number(relevant?.upVote.length) -
                  Number(relevant?.downVote.length)}{" "}
                votes
              </div>
              <div className="side-details m-1 text-nowrap">
                {relevant?.answer.length} answers
              </div>
              <div className="side-details m-1 text-muted">
                {Number(views)} views
              </div>
            </div>
            <div>
              <Link
                to={`/question/${relevant?._id}`}
                onClick={() => handleViews()}
              >
                {relevant?.questionTitle}
              </Link>
              <div className="description-text my-2">
                {relevant?.questionBody}
              </div>
              <div className="d-flex mt-2 gap-2" style={{ fontSize: "15px" }}>
                {relevant?.questionTags?.map((tag, i) => (
                  <div
                    key={i}
                    className="tagsDesign p-1"
                    style={{ fontSize: "12px" }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
