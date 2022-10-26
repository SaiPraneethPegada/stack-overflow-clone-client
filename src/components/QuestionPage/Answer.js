import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { API_URL } from "../../App";
import { getById } from "../../features/QuestionSlice";

function Answer({ question, id }) {
  const [postAnswer, setPostAnswer] = useState("");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      if (token) {
        let res = await axios.patch(
          `${API_URL}/answers/postAnswer/${id}`,
          {
            answerBody: postAnswer,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.statusCode === 200) {
          alert(res.data.message);
          dispatch(getById({ id }));
          setPostAnswer("");
        }
      } else {
        alert("Please login to post an Answer");
      }
    } catch (error) {
      alert("Answer", error.message);
    }
  };

  const deleteAnswer = async (answerId) => {
    try {
      if (token) {
        let res = await axios.patch(
          `${API_URL}/answer/delete/${id}`,
          { answerId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.statusCode === 200) {
          dispatch(getById({ id }));
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <section className="m-4 ">
        <div className="bottom-line mb-3">
          <div className="fs-4"> {question?.answer?.length} Answers</div>
          <div>
            {question?.answer?.map((ans, index) => {
              return (
                <div key={index} className="my-4 ms-5 ps-3">
                  <div className="text-nextline">{ans?.answerBody}</div>
                  <div style={{ fontSize: "13px" }}>
                    <div className="text-end text-muted mt-3 mx-3">
                      <div>{ans?.userAnswered}</div>
                      <div>{moment(ans?.answeredOn).fromNow()}</div>
                    </div>
                    <div>
                      {ans?.userId === userId ? (
                        <button
                          className="border-0 text-muted"
                          onClick={() => deleteAnswer(ans?._id)}
                        >
                          delete
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Post Answer */}
        <div className="fs-4">
          <div>Your Answer</div>
          <Form className="my-4" id="answer" onSubmit={(e) => handleComment(e)}>
            <Form.Group className="">
              <Form.Control
                as="textarea"
                rows={7}
                aria-describedby="answer"
                onChange={(e) => setPostAnswer(e.target.value)}
              />
              <div className="mb-5">
                {token ? (
                  <Button
                    variant="primary"
                    type="submit"
                    id="answer"
                    className="mt-4"
                  >
                    Post Your Answer
                  </Button>
                ) : (
                  <div className="text-danger text-center fs-6 my-3">
                    Please login to post your answer!
                  </div>
                )}
              </div>
            </Form.Group>
          </Form>
        </div>
      </section>
    </>
  );
}

export default Answer;
