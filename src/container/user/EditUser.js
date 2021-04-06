import React, { useState } from "react";
import { Card, Button, Form, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import UserPlaceHolder from "../../assets/images/placeholder.png";

function EditUser(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  //selectors
  const { loginSuccessData } = useSelector((state) => state);
  //states
  const [validated, setValidated] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  const [firstName, setFirstName] = useState(
    loginSuccessData && loginSuccessData.firstname
  );
  const [lastName, setLastName] = useState(
    loginSuccessData && loginSuccessData.lastname
  );

  const [phone, setPhone] = useState(
    loginSuccessData && loginSuccessData.phone_number
  );
  const [file, setFile] = useState(
    loginSuccessData && loginSuccessData.profile_picture
      ? loginSuccessData.profile_picture
      : ""
  );
  const [filePreView, setFilePreview] = useState();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false || !isPhoneValid) {
      setValidated(true);
    } else {
      const formData = new FormData();
      formData.append("firstname", firstName);
      formData.append("lastname", lastName);
      formData.append("phone_number", phone);
      filePreView && formData.append("profile_image", file, file.name);
      dispatch(updateUser(formData, history));
    }
  };
  const handleProfilePic = (e) => {
    setFile(e.target.files[0]);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleValidateNumber = (e) => {
    setPhone(e.target.value);
    var pattern = /^[0-9]*$/;
    if (!pattern.test(e.target.value)) {
      setIsPhoneValid(false);
    } else {
      setIsPhoneValid(true);
    }
  };

  return (
    <Card style={{ width: "50rem" }} className="card-center">
      <Card.Body>
        <Form.Row>
          <Col>
            <Card.Title>Edit user detail</Card.Title>
          </Col>
          <Col></Col>
        </Form.Row>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Form.Group>
            <Form.File
              type="file"
              id="profile"
              label="Select Profile Picture"
              onChange={handleProfilePic}
            />
            <br />
            {file ? (
              <Image
                src={
                  filePreView ||
                  "https://quiverx-images.s3.amazonaws.com/" + file
                }
                alt="profile"
                className="user-image"
              />
            ) : (
              <Image
                src={UserPlaceHolder}
                alt="profile"
                className="user-image"
              />
            )}
            <Form.Control.Feedback type="invalid">
              Please choose a profile picture.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="firstName">
            <Form.Label className="font-weight-bold">First Name</Form.Label>.
            <Form.Control
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter first name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label className="font-weight-bold">Last Name</Form.Label>.
            <Form.Control
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter last name
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label className="font-weight-bold">Email</Form.Label>.
            <Form.Control
              type="text"
              required
              value={loginSuccessData && loginSuccessData.email}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label className="font-weight-bold">Phone number</Form.Label>.
            <Form.Control
              type="text"
              required
              value={phone}
              onChange={(e) => {
                handleValidateNumber(e);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please enter phone number
            </Form.Control.Feedback>
          </Form.Group>
          {!isPhoneValid && (
            <>
              <Form.Label style={{ color: "red" }}>
                Please enter a valid phone number
              </Form.Label>
              <br />
            </>
          )}

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default EditUser;
