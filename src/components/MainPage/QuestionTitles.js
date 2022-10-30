import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../features/QuestionSlice";

export default function QuestionTitles({ questions, index }) {
  let question = questions;
  const [views, setViews] = useState(0);
  const quantity = useSelector((state) => state.questions.value);
  const dispatch = useDispatch();

  const handleViews = () => {
    dispatch(increment(question));
  };

  useEffect(() => {
    quantity.map((item) => {
      if (item._id === question._id) {
        return setViews(item.count);
      }
      return false;
    });
  }, [quantity, question._id, views, dispatch]);

  return (
    <div className="que-details my-3" key={index}>
      <div style={{ fontSize: "13px" }} className="m-2 text-end pe-2">
        <div className="side-details m-1">
          {Number(question.upVote.length) - Number(question.downVote.length)}{" "}
          votes
        </div>
        <div className="side-details m-1 text-nowrap">
          {question.answer.length} answers
        </div>
        <div className="side-details m-1 text-muted">{Number(views)} views</div>
      </div>
      <div className="que-title">
        <Link to={`/question/${question._id}`} onClick={() => handleViews()}>
          {question.questionTitle}
        </Link>
        <div className="description-text">{question.questionBody}</div>
        <div className="">
          <div className="d-flex mt-2 gap-2" style={{ fontSize: "15px" }}>
            {question.questionTags.map((tag, i) => (
              <div
                key={i}
                className="tagsDesign p-1"
                style={{ fontSize: "12px" }}
              >
                {tag}
              </div>
            ))}
          </div>
          <p className="text-end" style={{ fontSize: "13px" }}>
            {question.userPosted}{" "}
            <span className="text-muted">
              asked {moment(question.askedOn).fromNow()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
