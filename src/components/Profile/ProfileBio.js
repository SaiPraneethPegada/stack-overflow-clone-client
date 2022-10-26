import React from "react";

const ProfileBio = ({ user }) => {
  return (
    <>
      <div className="mx-5">
        <div className="my-5">
          <h5>Topics Interested</h5>
          <div className="mt-3">
            {user?.tags?.map((tag, i) => {
              return (
                <ul key={i}>
                  <li>{tag}</li>
                </ul>
              );
            })}
          </div>
        </div>
        <div>
          <h5>About</h5>
          <div className="m-3">
            {user?.about !== "" ? (
              <div>{user?.about}</div>
            ) : (
              <div>
                Your about me section is currently blank. Would you like to add
                one?
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBio;
