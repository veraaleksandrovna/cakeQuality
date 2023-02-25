import {
  Button,
  Card,
} from "react-bootstrap";
import React, { useState } from "react";
import "../styles/views/CakeListCard.css";
import { useHistory } from "react-router-dom";

export default function CakeListCard({
  name,
  image,
  description,
  country,
  manufacturer,
  composition,
  id,
}) {
  const history = useHistory();
  const routeChange = () => {
    let path = `/admin/cake/${id}`;
    history.push(path);
  };

  return (
    <div className="CakeListCard">
      <Card className="card-user">
        <div className="card-image">
          <img alt="..." src={require("assets/img/sky.jpg")}></img>
        </div>
        <Card.Body>
          <div className="author">
            <a href="#pablo" onClick={(e) => e.preventDefault()}>
              <img alt="..." className="avatar border-gray" src={image}></img>
              <h5 className="title">{name}</h5>
            </a>
            <p className="description">
              {manufacturer}, {country}
            </p>
          </div>
          <p className="description text-center">{description}</p>
          <p className="description text-center">Состав: {composition}</p>
          <Button variant="outline-primary" onClick={routeChange}>
            Подробнее
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
