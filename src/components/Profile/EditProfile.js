import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../features/AuthSlice";

const EditProfile = ({ user, setSwitch }) => {
  const [displayName, setDisplayName] = useState(user?.displayName);
  const [tags, setTags] = useState(() => {
    return user?.tags?.map((tag) => tag);
  });
  const [about, setAbout] = useState(user?.about);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(displayName, tags, about);
    dispatch(updateProfile({ displayName, about, tags }));
    setSwitch(false);
  };

  return (
    <>
      <div className="m-5 p-3">
        <h2>Edit your profile</h2>
        <Form className="col-md-6 my-4" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Display Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value.split(","))}
              placeholder="Tags separated by comma..."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>About</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Few lines About you..."
            />
          </Form.Group>
          <div className="d-flex gap-4">
            <div>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
            <div>
              <Button
                variant="primary"
                type="button"
                onClick={() => setSwitch(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default EditProfile;
