import axios from "axios";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import Answer from "./Answer";
import { API_URL } from "../../App";
import "../../App.css";
import { getById } from "../../features/QuestionSlice";
import LeftBar from "../LeftBar/LeftBar";
import downvote from "../../assets/sort-down.svg";
import RightSidebar from "../RightBar/RightSidebar";
import upvote from "../../assets/sort-up.svg";

export default function Question() {
  let vote = "";
  let question = [];
  const [upVote, setUpVote] = useState(0);
  const [downVote, setDownVote] = useState(0);
  const [views, setViews] = useState("");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.questions.value);
  const { loading, questionData } = useSelector((state) => state.questions);

  if (!loading) {
    question = questionData[0];
  }

  const handleVote = async (text) => {
    try {
      if (token) {
        if (text === "positive") {
          vote = text;
        } else if (text === "negative") {
          vote = text;
        }
        let res = await axios.patch(
          `${API_URL}/questions/vote/${id}`,
          {
            value: vote,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.statusCode === 200) {
          dispatch(getById({ id }));
        } else {
          alert(res.data.message);
        }
      } else {
        alert("Please login to vote");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteQuestion = async () => {
    try {
      if (token) {
        let res = await axios.delete(`${API_URL}/questions/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.statusCode === 200) {
          alert(res.data.message);
          navigate("/");
        } else {
          alert(res.data.message);
        }
      } else {
        alert("Please Login to Delete");
      }
    } catch (error) {
      // console.log("In Delete Que", error.message);
      alert(error.message);
    }
  };

  useEffect(() => {
    dispatch(getById({ id }));
  }, [id, dispatch]);

  useEffect(() => {
    if (question?._id) {
      quantity.map((item) => {
        if (item._id === question?._id) {
          return setViews(item.count);
        }
        return false;
      });
    }
  }, [views, quantity, question?._id]);

  useEffect(() => {
    setUpVote(question?.upVote?.length);
    setDownVote(question?.downVote?.length);
  }, [question?.upVote, question?.downVote, dispatch]);

  let votesCount = upVote - downVote;
  // console.log(votesCount);

  if (loading) {
    return (
      <div className="container d-grid w-100 justify-content-center align-items-end">
        <Spinner animation="grow" />
      </div>
    );
  }

  return (
    <div className="container home-container">
      <LeftBar />

      <div className="">
        {/* Question Title */}
        <div className="question-header justify-content-center mt-3">
          <div className="m-3">
            <div className="fs-3 ">{question?.questionTitle}</div>
            <div className="text-muted " style={{ fontSize: "13px" }}>
              Asked{" "}
              <span className="text-black me-5">
                {moment(question?.askedOn).fromNow()}
              </span>
              Modified {/* TODO : modified on */}
              <span className="text-black me-5">
                {moment(question?.updatedAt).fromNow("dddd")}
              </span>
              Viewed <span className="text-black me-5">{Number(views)}</span>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="primary" onClick={() => navigate("/ask")}>
              Ask a Question
            </Button>
          </div>
        </div>
        {/* Body */}
        <section className="grid-container">
          <div className="">
            <section className="bottom-line">
              <div className="d-flex m-3">
                <div style={{ width: "10%" }} className="text-center">
                  <button className="border-0 btn-bg">
                    <img
                      src={upvote}
                      alt=""
                      width="30"
                      className="votes-icon "
                      onClick={() => handleVote("positive")}
                    />
                  </button>
                  <div>{votesCount}</div>
                  <button className="border-0 btn-bg">
                    <img
                      src={downvote}
                      alt=""
                      width="30"
                      className="votes-icon"
                      onClick={() => handleVote("negative")}
                    />
                  </button>
                </div>
                <div style={{ width: "90%" }}>
                  <div className="m-3 text-nextline">
                    {question?.questionBody}
                  </div>
                  <div>
                    <div className="m-3 mt-4 d-flex gap-2 ">
                      {question?.questionTags?.map((tag, index) => {
                        return (
                          <div
                            key={index}
                            className="tagsDesign p-1"
                            style={{ fontSize: "12px" }}
                          >
                            {tag}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="text-muted " style={{ fontSize: "13px" }}>
                    <div className="mt-3 text-end">
                      <div>
                        Asked{" "}
                        <span>
                          {moment(question?.askedOn).format("MMM Do, h:mm a")}
                        </span>
                      </div>
                      <div>By : {question?.userPosted}</div>
                    </div>
                    <div className="ms-3 ">
                      {question?.userId === userId ? (
                        <>
                          <button
                            className="border-0 me-1 text-muted"
                            onClick={() => navigate(`/edit/${id}`)}
                          >
                            edit
                          </button>
                          <button
                            className="border-0 text-muted"
                            onClick={() => deleteQuestion()}
                          >
                            delete
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Answer Section */}
            <Answer question={question} id={id} />
          </div>

          {/* Right Content */}
          <div>
            <RightSidebar />
          </div>
        </section>
      </div>
    </div>
  );
}
