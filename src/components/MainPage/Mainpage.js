import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import RightSidebar from "../RightBar/RightSidebar";
import { getQuestions } from "../../features/QuestionSlice";
import QuestionTitles from "./QuestionTitles";
import "../../App.css";
import "./index.css";

export default function Mainpage() {
  let questions = [];
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const questionsPerPage = 5;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, questionsData } = useSelector((state) => state.questions);
  const result = useSelector((state) => state.questions.searchTerm);

  // console.log(result);

  if (!loading) {
    questions = questionsData[0];
  }

  const displayQuestions = questions
    ?.slice(itemOffset, itemOffset + questionsPerPage)
    .map((que, index) => (
      <QuestionTitles questions={que} index={index} key={index} />
    ));

  const filteredQuestions = questions
    ?.filter((que) => {
      if (result === "") {
        return que;
      } else if (
        que?.questionTitle?.toLowerCase().includes(result.toLowerCase())
      ) {
        // console.log(que);
        return que;
      }
      return false;
    })
    .map((que, index) => (
      <QuestionTitles questions={que} index={index} key={index} />
    ));

  useEffect(() => {
    dispatch(getQuestions());
    setPageCount(Math.ceil(questions?.length / questionsPerPage));
    // eslint-disable-next-line
  }, [dispatch, questionsPerPage]);

  const changePage = ({ selected }) => {
    const newOffset = (selected * questionsPerPage) % questions?.length;
    setItemOffset(newOffset);
  };

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
            {result === "" ? displayQuestions : filteredQuestions}
          </div>
          <div className="m-5">
            <ReactPaginate
              breakLabel="..."
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
        <div className="sidebar">
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
