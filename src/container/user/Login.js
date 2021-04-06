import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { login } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  //selector
  const { loginFailData } = useSelector((state) => state);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      event.preventDefault();
    } else {
      let params = {
        email: email,
        password: password,
      };
      dispatch(login(params, history)).then(() => {
        if (loginFailData) {
          event.preventDefault();
        }
      });
    }
  };

  return (
    <Card style={{ width: "50rem" }} className="card-center">
      <Card.Body>
        <Card.Title>Login</Card.Title>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              value={email}
            />
            <Form.Control.Feedback type="invalid">
              Please enter Email
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              value={password}
            />
            <Form.Control.Feedback type="invalid">
              Please enter password
            </Form.Control.Feedback>
          </Form.Group>

          {loginFailData && (
            <>
              <Form.Label style={{ color: "red" }}>
                {loginFailData.message}
              </Form.Label>
              <br />
            </>
          )}

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;
