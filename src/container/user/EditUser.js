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
  const [firstName, setFirstName] = useState(
    loginSuccessData && loginSuccessData.firstname
  );
  const [lastName, setLastName] = useState(
    loginSuccessData && loginSuccessData.lastname
  );

  const [phone, setPhone] = useState(
    loginSuccessData && loginSuccessData.phone_number
  );
  const [file, setFile] = useState();
  const [filePreView, setFilePreview] = useState();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      event.preventDefault();
    } else {
      event.preventDefault();

      let params = {
        firstname: firstName,
        lastname: lastName,
        phone_number: phone,
        profile_picture: filePreView || null,
      };
      dispatch(updateUser(params, history));
    }
  };

  const handleProfilePic = (e) => {
    setFile(e.target.files[0]);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
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
              <Image src={filePreView} alt="profile" className="user-image" />
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
                setPhone(e.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please enter phone number
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default EditUser;
