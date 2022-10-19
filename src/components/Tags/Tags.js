import React from "react";

import LeftBar from "../LeftBar";
import TagsList from "./TagsList";
import "./Tags.css";

const Tags = () => {
  const tagsList = [
    {
      id: 1,
      tagName: "javascript",
      tagDesc:
        "For questions regarding programming in ECMAScript (JavaScript/JS) and its various dialects/implementations (excluding ActionScript). Please include all relevant tags on your question;",
    },
    {
      id: 6,
      tagName: "html",
      tagDesc:
        "HTML (HyperText Markup Language) is the markup language for creating web pages and other information to be displayed in a web browser.",
    },
    {
      id: 3,
      tagName: "css",
      tagDesc:
        "CSS (Cascading Style Sheets) is a representation style sheet language used for describing the look and formatting of HTML (HyperText Markup Language), XML (Extensible Markup Language) documents and SVG elements including (but not limited to) colors, layout, fonts, and animations. It also describes how elements should be rendered on screen, on paper, in speech, or on other media.",
    },
    {
      id: 2,
      tagName: "python",
      tagDesc:
        "Python is a multi-paradigm, dynamically typed, multipurpose programming language. It is designed to be quick to learn, understand, and use, and enforces a clean and uniform syntax.",
    },
    {
      id: 4,
      tagName: "java",
      tagDesc:
        "Java is a high-level object oriented programming language. Use this tag when you're having problems using or understanding the language itself. ",
    },
    {
      id: 5,
      tagName: "php",
      tagDesc:
        "PHP is a widely used, open source, general-purpose, multi-paradigm, dynamically typed and interpreted scripting language originally designed for server-side web development",
    },
    {
      id: 7,
      tagName: "android",
      tagDesc:
        "Android is Google's mobile operating system, used for programming or developing digital devices (Smartphones, Tablets, Automobiles, TVs, Wear, Glass, IoT).",
    },
    {
      id: 8,
      tagName: "css",
      tagDesc:
        "CSS is a representation style sheet language used for describing the look and formatting of HTML, XML documents and SVG elements including colors, layout, fonts, and animations",
    },
    {
      id: 9,
      tagName: "reactjs",
      tagDesc:
        "React is a JavaScript library for building user interfaces. It uses a declarative, component-based paradigm and aims to be both efficient and flexible.",
    },
    {
      id: 10,
      tagName: "node.js",
      tagDesc:
        "Node.js is an event-based, non-blocking, asynchronous I/O runtime that uses Google's V8 JavaScript engine and libuv library. ",
    },
    {
      id: 11,
      tagName: "json",
      tagDesc:
        "JSON (JavaScript Object Notation) is a serializable data interchange format that is a machine and human readable. Do not use this tag for native JavaScript objects or JavaScript object literals. Before you ask a question, validate your JSON using a JSON validator such as JSONLint (https://jsonlint.com).",
    },
    {
      id: 12,
      tagName: "mongodb",
      tagDesc:
        "MongoDB is a scalable, high-performance, open source, document-oriented NoSQL database. It supports a large number of languages and application development platforms",
    },
  ];

  return (
    <div className="home-container container">
      <LeftBar />
      <div className="m-5">
        <div>
          <h1>Tags</h1>
          <p className="w-75">
            A tag is a keyword or label that categorizes your question with
            other, similar questions. Using the right tags makes it easier for
            others to find and answer your question.
          </p>
        </div>
        <div className="tags-list-container">
          {tagsList.map((tag, i) => (
            <TagsList tag={tag} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tags;
