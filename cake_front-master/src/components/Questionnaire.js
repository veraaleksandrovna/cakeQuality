import "../styles/common.scss";
import { Badge, Button, Card, Form } from "react-bootstrap";
import React, { useState } from "react";
import "../styles/views/Login.css";
import axios from "axios";
import { API_URL_QUESTIONNAIRE } from "../api/CakeApiUrls";

export default function Questionnaire({ id }) {
  const [item, setItem] = useState({
    shapeAndAppearance: "",
    structureAndConsistency: "",
    tasteAndSmell: "",
  });
  const { shapeAndAppearance } = item;
  const { structureAndConsistency } = item;
  const { tasteAndSmell } = item;

  const handleShapeChange = (e) => {
    e.persist();
    setItem((prevState) => ({
      ...prevState,
      shapeAndAppearance: e.target.value,
    }));
  };
  const handleStructureChange = (e) => {
    e.persist();
    setItem((prevState) => ({
      ...prevState,
      structureAndConsistency: e.target.value,
    }));
  };
  const handleTasteChange = (e) => {
    e.persist();
    setItem((prevState) => ({
      ...prevState,
      tasteAndSmell: e.target.value,
    }));
  };
  function validateForm() {
    return structureAndConsistency && tasteAndSmell && shapeAndAppearance;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      shape_and_appearance: item.shapeAndAppearance,
      structure_and_consistency: item.structureAndConsistency,
      taste_and_smell: item.tasteAndSmell,
      cake: id,
    };
    axios.post(API_URL_QUESTIONNAIRE, data, {
      headers: {
        Authorization: "Token " + localStorage.getItem('token'),
      },
    })
    window.location.reload(false);
  };

  return (
    <Card className="card-user cake-detail-card">
      <Card.Header>
        <Card.Title as="h4">Пройдите анкету</Card.Title>
        <p className="card-category">Расскажите свои впечатлия о торте</p>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit} className="questionnaire-form">
          <Form.Group controlId="shapeAndAppearance">
            <Form.Label>Форма,внешний вид</Form.Label>
            <Form.Check
              value={5}
              type="radio"
              aria-label="radio 1"
              label="Форма правильная, без изломов,вмятин.Поверхность художественно оформленная. Обрез ровный."
              onChange={handleShapeChange}
              checked={shapeAndAppearance === "5"}
            />
            <Form.Check
              value={4}
              type="radio"
              aria-label="radio 2"
              label="Форма правильная, без изломов, вмятин. Поверхность художественно оформленная. Допускается более низкий уровень художественного оформления."
              onChange={handleShapeChange}
              checked={shapeAndAppearance === "4"}
            />
            <Form.Check
              value={3}
              type="radio"
              aria-label="radio 3"
              label="Недостатки внешнего вида, более заметно выражены формы."
              onChange={handleShapeChange}
              checked={shapeAndAppearance === "3"}
            />
            <Form.Check
              value={2}
              type="radio"
              aria-label="radio 4"
              label="Расплывчатый рисунок, подгорелость, изломы,вмятины. Обрез не ровный.
          "
              onChange={handleShapeChange}
              checked={shapeAndAppearance === "2"}
            />
          </Form.Group>
          <Form.Group controlId="structureAndConsistency">
            <Form.Label>Структура и консистенция</Form.Label>
            <Form.Check
              value={5}
              type="radio"
              aria-label="radio 1"
              label="Пропеченность, отсутствие признаков непромеса, свежесть, отсутствие закала.
              "
              onChange={handleStructureChange}
              checked={structureAndConsistency === "5"}
            />
            <Form.Check
              value={4}
              type="radio"
              aria-label="radio 2"
              label="Допускаются незначительные отклонения от консистенции изделия"
              onChange={handleStructureChange}
              checked={structureAndConsistency === "4"}
            />
            <Form.Check
              value={3}
              type="radio"
              aria-label="radio 3"
              label="Допускаются более заметные отклонения, но в пределах допустимого
              "
              onChange={handleStructureChange}
              checked={structureAndConsistency === "3"}
            />
            <Form.Check
              value={2}
              type="radio"
              aria-label="radio 4"
              label="Прослойка неравномерна. Отклонения, не характерные изделия
          "
              onChange={handleStructureChange}
              checked={structureAndConsistency === "2"}
            />
          </Form.Group>
          <Form.Group controlId="shapeAndAppearance">
            <Form.Label>Вкус и запах</Form.Label>
            <Form.Check
              value={5}
              type="radio"
              aria-label="radio 1"
              label="Хорошо выраженные вкус и запах, характерные для изделия. Без посторонних привкусов и запахов.
              "
              onChange={handleTasteChange}
              checked={tasteAndSmell === "5"}
            />
            <Form.Check
              value={4}
              type="radio"
              aria-label="radio 2"
              label="Вкус и запах выражены слабо. Без посторонних привкусов и запахов."
              onChange={handleTasteChange}
              checked={tasteAndSmell === "4"}
            />
            <Form.Check
              value={3}
              type="radio"
              aria-label="radio 3"
              label="Характерные вкус и запах, но слабо выражены.
              "
              onChange={handleTasteChange}
              checked={tasteAndSmell === "3"}
            />
            <Form.Check
              value={2}
              type="radio"
              aria-label="radio 4"
              label="Посторонние привкус и запах."
              onChange={handleTasteChange}
              checked={tasteAndSmell === "2"}
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
