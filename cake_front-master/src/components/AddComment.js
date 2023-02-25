import "../styles/common.scss";
import { Badge, Button, Card, Form } from "react-bootstrap";
import React, { useState } from "react";
import "../styles/views/Login.css";
import axios from "axios";
import { API_URL_COMMENTS} from "../api/CakeApiUrls";

export default function AddComment({ cakeId }) {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    e.persist();
    setText(e.target.value)
  };
  function validateForm() {
    return text!=='';
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      text: text
    };
    axios.post(`${API_URL_COMMENTS}${cakeId}/`, data, {
      headers: {
        Authorization: "Token " + localStorage.getItem('token'),
      },
    })
    window.location.reload(false);
  };

  return (
    <Card className="card-user cake-detail-card">
      <Card.Header>
        <Card.Title as="h4">Оставьте комментарий</Card.Title>
        <p className="card-category">Расскажите свои впечатлия о торте</p>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit} className="questionnaire-form">
          <Form.Group>
            <Form.Control as="textarea" rows={3} 
            onChange={handleChange}
            />
          </Form.Group>
          <Button
            block="true"
            variant="info"
            size="lg"
            type="submit"
            disabled={!validateForm()}
          >
            Отправить
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
