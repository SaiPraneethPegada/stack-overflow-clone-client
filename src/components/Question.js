import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LeftBar from "./LeftBar";
// import { url } from "../App";
// import axios from "axios";
import Button from "react-bootstrap/Button";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import moment from "moment";
import upvote from "../assets/sort-up.svg";
import downvote from "../assets/sort-down.svg";
import RightSidebar from "./RightBar/RightSidebar";
import {
  useGetQuestionByIdQuery,
  usePostAnswerMutation,
  useVoteQuestionMutation,
} from "../services/Question";

export default function Questions() {
  let question = "";
  let [postAnswer, setPostAnswer] = useState("");
  // const [vote, setVote] = useState("");
  let vote = "";
  const token = localStorage.getItem("token");
  // const userName = localStorage.getItem("displayName");
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const QueResponse = useGetQuestionByIdQuery(id);
  const [answer, AnsResponse] = usePostAnswerMutation();
  const [voteData, VoteResponse] = useVoteQuestionMutation();

  // console.log(QueResponse);
  if (QueResponse.isSuccess) {
    question = QueResponse.data.question;
  }

  if (QueResponse.isLoading) return <div>Loading...</div>;
  console.log(question);

  // const getQuestion = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(`${url}/questions/get/${id}`);
  //     setQuestion(res.data.question);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setLoading(false);
  // };

  const handleVote = async (text) => {
    console.log(text);
    try {
      if (token) {
        if (text === "upVote") {
          console.log("Up");
          vote = text;
        } else if (text === "downVote") {
          console.log("Down");
          vote = text;
        }

        let data = {
          vote,
          id,
        };
        voteData(data).unwrap();
        console.log(VoteResponse);
        // const res = await axios.patch(
        //   `${url}/questions/vote/${id}`,
        //   { value: vote },
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );
        // console.log(res);
        // if (res.data.statusCode === 200) {
        //   // getQuestion();
        // } else {
        //   alert(res.data.message);
        // }
      } else {
        alert("Please login to vote");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    console.log(postAnswer);
    try {
      if (token) {
        let data = {
          answerBody: postAnswer,
          id: id,
        };
        answer(data).unwrap();
        console.log(AnsResponse);

        // const res = await axios.patch(
        //   `${url}/answers/postAnswer/${id}`,
        //   {
        //     answerBody: postAnswer,
        //   },
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );
        // if (res.data.statusCode === 200) {
        //   alert("Answer Posted Successfully!");
        //   setPostAnswer("");
        // } else {
        //   alert(res.data.message);
        // }
      } else {
        alert("Please login to vote");
      }
      console.log(postAnswer);
    } catch (error) {
      console.log(error);
    }
  };

  if (AnsResponse.isSuccess) {
    alert(AnsResponse.data.message);
  }

  // // console.log(vote);

  // useEffect(() => {
  //   getQuestion();
  //   // eslint-disable-next-line
  // }, [id]);

  return (
    <div className="container home-container">
      <LeftBar />
      <div className="question-container">
        {/* Question Title */}
        <div className="question-header justify-content-center mt-3">
          <div className="m-3">
            <div className="fs-3 ">{question.questionTitle}</div>
            <div className="text-muted " style={{ fontSize: "13px" }}>
              Asked{" "}
              <span className="text-black me-5">
                {moment(question.askedOn).fromNow()}
              </span>
              Modified {/* TODO : modified on */}
              <span className="text-black me-5">
                {moment(question.updatedAt).fromNow("dddd")}
              </span>
              Viewed <span className="text-black me-5">1</span>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="primary" onClick={() => navigate("/ask")}>
              Ask a Question
            </Button>
          </div>
        </div>
        <hr />
        {/* Body */}
        <section className="grid-container">
          <div className="">
            <section>
              <div className="d-flex m-3">
                <div style={{ width: "10%" }} className="text-center">
                  <button className="border-0 bg-white">
                    <img
                      src={upvote}
                      alt=""
                      width="30"
                      className="votes-icon "
                      onClick={() => handleVote("upVote")}
                    />
                  </button>
                  {/* <div>
                    {question.upVote?.length - question.downVote?.length}
                  </div> */}
                  <button className="border-0 bg-white">
                    <img
                      src={downvote}
                      alt=""
                      width="30"
                      className="votes-icon"
                      onClick={() => handleVote("downVote")}
                    />
                  </button>
                </div>
                <div style={{ width: "90%" }}>
                  <div className="m-3">Body: {question.questionBody}</div>
                  <div>
                    <div className="m-3 mt-4 d-flex gap-2 ">
                      {question.questionTags?.map((tag, index) => {
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
                          {moment(question.askedOn).format("MMM Do, h:mm a")}
                        </span>
                      </div>
                      <div>By : {question.userPosted}</div>
                    </div>
                    <div className="ms-3 ">
                      <button className="border-0 me-1 text-muted">edit</button>
                      <button className="border-0 text-muted">delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <hr className="ms-5" />
            {/* Answer Section */}
            <section className="m-4 ">
              <div className="fs-4"> {question.answer?.length} Answers</div>

              <div>
                {question.answer?.map((ans, index) => {
                  return (
                    <div key={index} className="my-3 ms-5 ps-3">
                      <div>{ans.answerBody}</div>
                      <div
                        className="text-end text-muted m-3"
                        style={{ fontSize: "13px" }}
                      >
                        <div>{ans.userAnswered}</div>
                        <div>{moment(ans.answeredOn).fromNow()}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <hr />
              {/* Post Answer */}
              <div className="fs-4">
                <div>Your Answer</div>
                <Form
                  className="my-4"
                  id="answer"
                  onSubmit={(e) => handleComment(e)}
                >
                  <Form.Group className="">
                    <Form.Control
                      as="textarea"
                      rows={7}
                      aria-describedby="answer"
                      onChange={(e) => setPostAnswer(e.target.value)}
                    />
                    <div className="mb-5">
                      <Button
                        variant="primary"
                        type="submit"
                        id="answer"
                        className="mt-4"
                      >
                        Post Your Answer
                      </Button>
                    </div>
                  </Form.Group>
                </Form>
              </div>
            </section>
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
