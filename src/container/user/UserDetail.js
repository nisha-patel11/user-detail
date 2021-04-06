import React from "react";
import { Card, Button, Form, Col, Row, Image } from "react-bootstrap";

import { useSelector } from "react-redux";
import UserPlaceHolder from "../../assets/images/placeholder.png";
import { useHistory } from "react-router-dom";

function UserDetail(props) {
  const history = useHistory();

  //selectors
  const { loginSuccessData } = useSelector((state) => state);

  const handleLogout = () => {
    history.push("/");
    localStorage.removeItem("token");
    localStorage.removeItem("isLogin");
  };

  return (
    <Card style={{ width: "50rem" }} className="card-center">
      <Row style={{ marginBottom: "10px", textAlign: "right" }}>
        <Col>
          <Button
            onClick={() => {
              handleLogout();
            }}
          >
            Logout
          </Button>
        </Col>
      </Row>
      <Card.Body>
        <Form.Row>
          <Col>
            <Card.Title>LoggedIn user detail</Card.Title>
          </Col>
          <Col>
            <Form.Row>
              <Col>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => {
                    history.push("/edit-user");
                  }}
                >
                  Edit
                </Button>
              </Col>
            </Form.Row>
          </Col>
        </Form.Row>

        {loginSuccessData && loginSuccessData.profile_picture ? (
          <Image
            src={
              "https://quiverx-images.s3.amazonaws.com/" +
              loginSuccessData.profile_picture
            }
            alt="user image"
          />
        ) : (
          <Image
            src={UserPlaceHolder}
            alt="user image"
            className="user-image"
          />
        )}

        <Form.Group controlId="firstName">
          <Form.Label className="font-weight-bold">First Name</Form.Label>.
          <Form.Control
            type="text"
            required
            value={loginSuccessData && loginSuccessData.firstname}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label className="font-weight-bold">Last Name</Form.Label>.
          <Form.Control
            type="text"
            required
            value={loginSuccessData && loginSuccessData.lastname}
            disabled
          />
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
            value={loginSuccessData && loginSuccessData.phone_number}
            disabled
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
}

export default UserDetail;
