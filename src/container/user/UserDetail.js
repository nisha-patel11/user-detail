import React, { useState } from "react";
import {
  Card,
  Button,
  Form,
  Col,
  Row,
  Image,
  Container,
  Modal,
} from "react-bootstrap";

import { useSelector } from "react-redux";
import UserPlaceHolder from "../../assets/images/placeholder.png";
import { useHistory } from "react-router-dom";

function UserDetail(props) {
  const history = useHistory();

  //state
  const [show, setShow] = useState(false);

  //selectors
  const { loginSuccessData } = useSelector((state) => state);

  const handleLogout = () => {
    history.push("/");
    localStorage.removeItem("token");
    localStorage.removeItem("isLogin");
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid>
      <Row style={{ marginBottom: "10px", textAlign: "right", padding: 5 }}>
        <Col>
          <Button
            onClick={() => {
              handleShow();
            }}
          >
            Logout
          </Button>
        </Col>
      </Row>
      <Card style={{ width: "50rem" }} className="card-center">
        <Card.Body>
          <Form.Row>
            <Col sm={11}>
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
              alt="profile"
              className="user-image"
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleLogout}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default UserDetail;
