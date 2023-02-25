import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import React, { useState, useMemo, useEffect } from "react";
import "../styles/views/CakeList.css";
import axios from "axios";
import {
  API_URL_CAKES,
  API_URL_EXPORT_CSV_CAKE_QUALITY,
  API_URL_MANUFACTURERS,
  API_URL_COUNTRIES,
} from "../api/CakeApiUrls";
import CakeListCard from "../components/CakeListCard";
import ReactPaginate from "react-paginate";

export default function CakeList() {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [params, setParams] = useState({});
  const [perPage] = useState(2);
  const [pageCount, setPageCount] = useState(0);
  const [countryInfo, setCountryInfo] = useState([]);
  const [manufacturerInfo, setManufacturerInfo] = useState([]);
  
  const getCountManData = async () => {
    const countries = await axios.get(API_URL_COUNTRIES);
    setCountryInfo(countries.data);
    const manufacturers = await axios.get(API_URL_MANUFACTURERS);
    setManufacturerInfo(manufacturers.data);
    
  };
  const getCakeData = async () => {
    const res = await axios.get(API_URL_CAKES, {params});
    const data = res.data;

    const slice = data.slice(offset, offset + perPage);
    const postData = slice.map((cake) => (
      <Col>
        <CakeListCard
          key={cake.id}
          id={cake.id}
          name={cake.name}
          image={cake.image}
          description={cake.description}
          manufacturer={cake.manufacturer}
          country={cake.country}
          composition={cake.composition}
        />
      </Col>
    ));
    setData(postData);
    setPageCount(Math.ceil(data.length / perPage));
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  useEffect(() => {
    getCakeData();
    getCountManData();
  }, [offset, params]);

  const handleChange = (e) => {
    e.persist();
    if (e.target.value !='false') {
      setParams((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
    else {
        delete params[e.target.name]
        getCakeData()
        

    }
  };

  return (
    <Container fluid className="p-5">
      <Row>
        <a href={API_URL_EXPORT_CSV_CAKE_QUALITY}>
          <Button block="true" variant="dark" size="lg" className="m-4">
            Экспортировать
          </Button>
        </a>
        <Button block="true" variant="dark" size="lg" className="m-4">
          <Link to="/admin/cake/1">Базовый объект</Link>
        </Button>

        <Form >
        <Row>
          <Form.Group size="lg" className="m-1">
            
            <Form.Label >Страна</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              as="select"
              name="country__id"
            >
              <option value={false}>Все</option>
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
              name="manufacturer__id"
            >
            <option value={false}>Все</option>
              {manufacturerInfo.map((manufacturer) => (
                <option value={manufacturer.id}>{manufacturer.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          </Row>
        </Form>
      </Row>
      <Row>{data}</Row>
      <Row>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </Row>
    </Container>
  );
}
