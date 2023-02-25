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

export default function AddCake() {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const [data, setData] = useState({
    name: null,
    manufacturer: "1",
    description: null,
    composition: null,
    country: "1",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [countryInfo, setCountryInfo] = useState([]);
  const [manufacturerInfo, setManufacturerInfo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(API_URL_COUNTRIES).then((response) => {
      setCountryInfo(response.data);
    });
    axios.get(API_URL_MANUFACTURERS).then((response) => {
      setManufacturerInfo(response.data);
    });
    setLoading(false);
  };

  const handleChange = (e) => {
    e.persist();
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(data);
  };

  const handleImageChange = (e) => {
    e.persist();
    setData((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };


  function handleSubmit(event) {
    event.preventDefault();
    const form_data = new FormData();

    form_data.append('name', data.name);
    form_data.append("manufacturer", data.manufacturer);
    form_data.append("composition", data.composition);
    form_data.append("description", data.description);
    form_data.append("image", data.image);
    form_data.append("country", data.country);
    axios
      .post(API_URL_CAKES, form_data, {
        headers: {
          Authorization: "Token " + localStorage.getItem('token'),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setShowError(false);
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
          <Form.Label>Наименование</Form.Label>
          <Form.Control
            required
            name="name"
            type="text"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group size="lg" className="m-1">
          <Form.Label>Страна</Form.Label>
          <Form.Control
            required
            onChange={handleChange}
            as="select"
            name="country"
          >
            {countryInfo.map((country) => (
              <option value={country.id}>{country.name}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group size="lg" className="m-1">
          <Form.Label>Производитель</Form.Label>
          <Form.Control
            required
            onChange={handleChange}
            as="select"
            name="manufacturer"
          >
            {manufacturerInfo.map((manufacturer) => (
              <option value={manufacturer.id}>{manufacturer.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group size="lg" className="m-1">
          <Form.Label>Описание</Form.Label>
          <Form.Control
            required
            name="description"
            as="textarea"
            rows={3}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group size="lg" className="m-1">
          <Form.Label>Состав</Form.Label>
          <Form.Control
            required
            name="composition"
            as="textarea"
            rows={3}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group size="lg" className="m-1">
          <Form.Label>Изображение</Form.Label>
          <Form.Control
            required
            type="file"
            name="image"
            onChange={handleImageChange}
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
          Добавить торт
        </Button>
      </Form>
    </div>
  );
}
