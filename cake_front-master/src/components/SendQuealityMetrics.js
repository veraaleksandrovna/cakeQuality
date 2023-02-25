import "../styles/common.scss";
import { Badge, Button, Card, Form } from "react-bootstrap";
import React, { useState } from "react";
import "../styles/views/Login.css";
import axios from "axios";
import { API_URL_QUALITY_METRICS } from "../api/CakeApiUrls";
import { convertCompilerOptionsFromJson } from "typescript";

export default function SendQuealityMetrics({ id }) {
  const [data, setData] = useState({
    cake: id,
    margarine_presence: false,
    preservatives_presence: false,
    antioxidants_presence: false,
    benzoic_acid_presence: false,
    sodium_benzoate_presence: false,
    sodium_pyrosulfite_presence: false,
    potassium_pyrosulfite_presence: false,
    calcium_sulfite_presence: false,
    nisin_presence: false,
    butylhydroxyanisole_presence: false,
  });

  const handleChange = (e) => {
    e.persist();
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    axios.post(API_URL_QUALITY_METRICS, data, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
    window.location.reload(false);
  };

  return (
    <Card className="card-user cake-detail-card">
      <Card.Header>
        <Card.Title as="h4">Оцените качество</Card.Title>
        <p className="card-category">Укажите наличие вредных добавок</p>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit} className="quality-metrics-form">
          <Form.Group>
            <Form.Check
              inline
              name="margarine_presence"
              type="checkbox"
              aria-label="radio 1"
              onChange={handleChange}
            />
            <Form.Label>Наличие маргарина</Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Check
              inline
              name="preservatives_presence"
              type="checkbox"
              aria-label="radio 1"
              onChange={handleChange}
            />
            <Form.Label>Наличие консервантов E200-299</Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Check
              inline
              name="antioxidants_presence"
              type="checkbox"
              aria-label="radio 1"
              onChange={handleChange}
            />
            <Form.Label>Наличие антиокислителей E300-399</Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Check
              inline
              name="margarine_presence"
              type="checkbox"
              aria-label="radio 1"
              onChange={handleChange}
            />
            <Form.Label>Наличие маргарина</Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Check
              inline
              name="benzoic_acid_presence"
              type="checkbox"
              aria-label="radio 1"
              onChange={handleChange}
            />
            <Form.Label>Наличие бензойной кислоты Е-210</Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Check
              inline
              name="margarine_presence"
              type="checkbox"
              aria-label="radio 1"
              onChange={handleChange}
            />
            <Form.Label>Наличие маргарина</Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Check
              inline
              name="sodium_benzoate_presence"
              type="checkbox"
              aria-label="radio 1"
              onChange={handleChange}
            />
            <Form.Label>Наличие бензоата натрия Е-211</Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Check
              inline
              name="sodium_pyrosulfite_presence"
              type="checkbox"
              aria-label="radio 1"
              onChange={handleChange}
            />
            <Form.Label>Наличие пиросульфита натрия Е-223</Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Check
              inline
              name="potassium_pyrosulfite_presence"
              type="checkbox"
              aria-label="radio 1"
              onChange={handleChange}
            />
            <Form.Label>Наличие пиросульфита калия Е-224</Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Check
              inline
              name="calcium_sulfite_presence"
              type="checkbox"
              aria-label="radio 1"
              onChange={handleChange}
            />
            <Form.Label>Наличие сульфита кальция Е-226</Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Check
              inline
              name="nisin_presence"
              type="checkbox"
              aria-label="radio 1"
              onChange={handleChange}
            />
            <Form.Label>Наличие низина Е-234</Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Check
              inline
              name="butylhydroxyanisole_presence"
              type="checkbox"
              aria-label="radio 1"
              onChange={handleChange}
            />
            <Form.Label>Наличие бутилгидроксианизола E-320</Form.Label>
          </Form.Group>

          <Button block="true" variant="info" size="lg" type="submit">
            Отправить
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
