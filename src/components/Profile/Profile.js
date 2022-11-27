import React, { useState } from "react";
import LeftBar from "../LeftBar/LeftBar";
import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";
import { useSelector } from "react-redux";
import ProfileBio from "./ProfileBio";
import EditProfile from "./EditProfile";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Calender from "../../assets/calender.svg";
import { Spinner } from "react-bootstrap";

function Profile() {
  const [Switch, setSwitch] = useState(false);
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.auth.userData);
  const { loading } = useSelector((state) => state.auth);
  // console.log(user);

  return (
    <>
      {token ? (
        <div className="home-container container">
          <LeftBar />
          <>
            {loading ? (
              <div className="container d-grid justify-content-center align-items-center">
                <Spinner animation="grow" />
              </div>
            ) : (
              <section className="mx-4 mt-4">
                <div className="d-flex gap-4 justify-content-between">
                  <div className="d-flex gap-4 align-items-center">
                    <div>
                      <Avatar
                        sx={{ bgcolor: green[500], width: 125, height: 125 }}
                        variant="square"
                        className="display-1 fs-1 fw-bolder"
                      >
                        {user?.displayName?.split("")[0]}
                      </Avatar>
                    </div>
                    <div>
                      <div className="fs-2 mb-2">{user?.displayName}</div>
                      <div className="text-muted">
                        <img src={Calender} alt="" className="me-2" />
                        {moment(user?.createdAt).fromNow()}
                      </div>
                    </div>
                  </div>
                  <div className="me-5 ">
                    <Button variant="primary" onClick={() => setSwitch(true)}>
                      Edit Profile
                    </Button>
                  </div>
                </div>
                <>
                  {Switch ? (
                    <EditProfile setSwitch={setSwitch} user={user} />
                  ) : (
                    <ProfileBio user={user} />
                  )}
                </>
              </section>
            )}
          </>
        </div>
      ) : (
        <div>Please Login...</div>
      )}
    </>
  );
}

export default Profile;
