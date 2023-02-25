import { Button, Card } from "react-bootstrap";
import "../styles/common.scss";
import {API_URL_EXPORT_TXT_CAKE_QUALITY} from "../api/CakeApiUrls";

export default function CakeDetailCard({
  average_grade,
  composition,
  country,
  description,
  image,
  manufacturer,
  name,
  id,
}) {
  return (
    <Card className="card-user cake-detail-card">
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
            {average_grade ? average_grade : "Нет рейтигна"}{" "}
            <img className="star" src={require("assets/img/star.png")} />
          </p>
          <p className="description">
            {manufacturer}, {country}
          </p>
        </div>
        <p className="description text-center">{description}</p>
        <p className="description text-center">Состав: {composition}</p>
          <a className="description text-center" href={API_URL_EXPORT_TXT_CAKE_QUALITY+`${id}/`}>
            <Button block="true" variant="dark" size="lg" className="m-4">
              Отчет об оценке
            </Button>
          </a>
      </Card.Body>
    </Card>
  );
}
