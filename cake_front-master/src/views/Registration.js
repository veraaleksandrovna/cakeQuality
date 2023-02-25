import {
  Button,
  Form,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import React, { useState } from "react";
import "../styles/views/Registration.css"
import axios from 'axios';
import {API_URL_SIGNUP} from "../api/CakeApiUrls";


export default function Registration() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage]  = useState("");
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
	let data = {username: username, password: password}
  	axios.post(API_URL_SIGNUP, data)
        .then(response => {
          setShowError(false);
          history.push('/admin/login')
        })
        .catch((error) => {
		  setShowError(true);
          if (error.response) {
            for (let key in error.response.data) {
            setErrorMessage(error.response.data[key][0])
            }
          }
          console.log(errorMessage)
        })
  }

  return (
    <div className="Registration">
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
        <Form.Group size="lg" controlId="email">
          <Form.Label>Почта</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

      <Alert variant='warning' style={{display: showError ? 'block' : 'none' }}>
          {errorMessage}
        </Alert>
        <Button block="true" variant="primary" size="lg" type="submit"  disabled={!validateForm()}>
          Регистрация
        </Button>
      </Form>
    </div>
  );
}
