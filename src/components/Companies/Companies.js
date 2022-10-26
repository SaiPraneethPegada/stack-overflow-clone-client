import React from "react";
import LeftBar from "../LeftBar/LeftBar";

function Companies() {
  const companyList = [
    {
      id: 1,
      name: "Company1",
      description:
        "The database market is massive (IDC estimates it to be $137B in 2026!) and MongoDB is leading its disruption. The MongoDB community is transforming industries and empowering developers to build amazing apps that people use every day.",
    },
    {
      id: 2,
      name: "Company2",
      description:
        "The database market is massive (IDC estimates it to be $137B in 2026!) and MongoDB is leading its disruption. The MongoDB community is transforming industries and empowering developers to build amazing apps that people use every day.",
    },
    {
      id: 3,
      name: "Company3",
      description:
        "The database market is massive (IDC estimates it to be $137B in 2026!) and MongoDB is leading its disruption. The MongoDB community is transforming industries and empowering developers to build amazing apps that people use every day.",
    },
    {
      id: 4,
      name: "Company4",
      description:
        "The database market is massive (IDC estimates it to be $137B in 2026!) and MongoDB is leading its disruption. The MongoDB community is transforming industries and empowering developers to build amazing apps that people use every day.",
    },
    {
      id: 5,
      name: "Company5",
      description:
        "The database market is massive (IDC estimates it to be $137B in 2026!) and MongoDB is leading its disruption. The MongoDB community is transforming industries and empowering developers to build amazing apps that people use every day.",
    },
  ];
  return (
    <div className="home-container container">
      <LeftBar />
      <section>
        <div className="p-3 m-3">
          <h1>Companies</h1>
          <p>Learn about what it's like to work at companies</p>
        </div>
        <hr />
        <div className="m-3">
          {companyList.map((list) => (
            <div className="m-5 shadow rounded p-5 d-flex gap-4">
              <div>
                <img src="https://via.placeholder.com/60" alt="sample" />
              </div>
              <div>
                <h4>{list.name}</h4>
                <div>{list.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Companies;
