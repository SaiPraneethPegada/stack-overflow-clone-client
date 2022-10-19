import React from "react";
import "./RightSidebar.css";
import comment from "../../assets/comment-alt-solid.svg";
import pen from "../../assets/pen-solid.svg";
import blackLogo from "../../assets/blacklogo.svg";

const Widget = () => {
  return (
    <div className="widget">
      <h4>The Overflow Blog</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <img src={pen} alt="pen" width="14" />
          <p>The robots are coming… but when? (Ep 496)</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={pen} alt="pen" width="14" />
          <p>Synthetic data: Big data, fewer privacy risks </p>
        </div>
      </div>
      <h4>Featured on Meta</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <img src={comment} alt="pen" width="14" />
          <p>Bookmarks have evolved into Saves</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={comment} alt="pen" width="14" />
          <p>
            Inbox improvements: marking notifications as read/unread, and a
            filtered...
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={blackLogo} alt="pen" width="14" />
          <p>Collectives Update: Recognized Members, Articles, and GitLab</p>
        </div>
      </div>
      <h4>Hot Meta Posts</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <p>61</p>
          <p>
            Should this self answer by a new poster have been deleted in review?
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <p>5</p>
          <p>
            Should the [brave] and [brave-browser] tags be merged, and if so,
            what should...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Widget;
