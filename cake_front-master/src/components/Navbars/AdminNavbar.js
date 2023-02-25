import React, { Component } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";

import routes from "routes.js";

function Header() {
  const history = useHistory();

  const location = useLocation();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Торты";
  };
  const getUsername = () => {
  var username = localStorage.getItem('username')
  return username ? ', ' +username : ''
  }
   const handleLogout = (e) => {
   (e) => e.preventDefault()
    localStorage.removeItem('token');
    localStorage.removeItem('is_superuser');
    localStorage.removeItem('username');
    localStorage.setItem('logged_in', false);
    history.push('/admin/login');
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar>
            <Nav.Item>
              <Nav.Link
                className="m-0"
                href="/admin/registration"
              >
                <span className="no-icon">Добро пожаловать{getUsername()}!</span>
              </Nav.Link>
            </Nav.Item>

          </Nav>

          <Nav className="ml-auto" navbar>
            {localStorage.getItem('username') ?

            <Nav.Item>
              <Nav.Link
                className="m-0"
                href="/admin"
                onClick={(e) =>  handleLogout()}
              >
                <span className="no-icon">Выход</span>
              </Nav.Link>
            </Nav.Item>
			:
            <><Nav.Item>
              <Nav.Link
                className="m-0"
                href="/admin/login"
              >
                <span className="no-icon">Вход</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className="m-0"
                href="/admin/registration"
              >
                <span className="no-icon">Регистрация</span>
              </Nav.Link>
            </Nav.Item>
            </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
