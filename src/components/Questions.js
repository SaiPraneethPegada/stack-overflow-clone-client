import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

export default function Questions({ questions, index }) {
  console.log(questions);
  return (
    <div className="que-details my-3" key={index}>
      <div style={{ fontSize: "13px" }} className="m-2 text-end pe-2">
        <div className="side-details m-1">
          {questions.upVote.length - questions.downVote.length} votes
        </div>
        <div className="side-details m-1">
          {questions.answer.length} answers
        </div>
        <div className="side-details m-1 text-muted">0 views</div>
      </div>
      <div className="que-title" key={index}>
        <Link to={`/question/${questions._id}`}>{questions.questionTitle}</Link>
        <div className="description-text">{questions.questionBody}</div>
        <div className="display-tags-time">
          <div className="d-flex mt-2 gap-2" style={{ fontSize: "15px" }}>
            {questions.questionTags.map((tag, i) => (
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
            {questions.userPosted}{" "}
            <span className="text-muted">
              asked {moment(questions.askedOn).fromNow()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
