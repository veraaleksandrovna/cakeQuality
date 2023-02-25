import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  API_URL_MANUFACTURERS,
  API_URL_COUNTRIES,
  API_URL_CAKES,
} from "../api/CakeApiUrls";

export default function AddManufacturer() {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState({
    country: null,
  });
  const handleChange = (e) => {
    e.persist();
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(API_URL_MANUFACTURERS, data, {
        headers: {
          Authorization: "Token " + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setErrorMessage('Успешно!');
        history.push("/admin/cakes");
      })
      .catch((error) => {
        setShowError(true);
        if (error.response) {
          console.log(error.response);
          for (let key in error.response.data) {
            setErrorMessage(error.response.data[key][0]);
          }
        }
        console.log(errorMessage);
      });
  }

  return (
    <div className="Registration">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" className="m-1">
          <Form.Label>Название</Form.Label>
          <Form.Control
            required
            name="name"
            type="text"
            onChange={handleChange}
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
          variant="dark"
          size="lg"
          type="submit"
          className="m-4"
        >
          Добавить производителя
        </Button>
      </Form>
    </div>
  );
}
