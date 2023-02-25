import {
  Button,
  Form,
} from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import React, { useState } from "react";
import "../styles/views/Login.css";
import axios from "axios";
import { API_URL_LOGIN } from "../api/CakeApiUrls";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {

    event.preventDefault();
    let data = { username: username, password: password };
    axios
      .post(API_URL_LOGIN, data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("logged_in", true);
        localStorage.setItem("username", username);
        localStorage.setItem("is_superuser", response.data.user.is_superuser);
        history.push('/admin/cakes');
      })
      .catch((error) => {
        console.log(error);
        setShowError(true);
        if (error.response) {
          for (let key in error.response.data) {
            setErrorMessage(error.response.data[key][0]);
          }
        }
        console.log(errorMessage);
      });
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Alert
          variant="warning"
          style={{ display: showError ? "block" : "none" }}
        >
          {errorMessage}
        </Alert>
        <Button
          block="true"
          variant="primary"
          size="lg"
          type="submit"
          disabled={!validateForm()}
        >
          Вход
        </Button>
      </Form>
    </div>
  );
}
