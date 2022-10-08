import React, { useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import { Cart } from "../pages";

const NavBar = () => {

  const [show, setShow] = useState(false);
  
  const navigate = useNavigate()
  
  const token = localStorage.getItem("token")
  
  const handleClose = () => setShow(false);
  const handleShow = () =>{ 
    if(token.length > 10){
      setShow(true);
    } else {
      navigate("/login")
    }
  }  
  
  const logout = () => {
    localStorage.setItem("token","")
    navigate("/login")
  }  


  return (
    <div>
      <Navbar fixed="top" bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/#/">E-COMMERCE</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={handleShow}>Cart</Nav.Link>
              <Nav.Link href="/#/purchases">Purchases</Nav.Link>
              {
                token ? (
                  <Nav.Link 
                  as={Button} 
                  onClick={logout} 
                  style={{background: "var(--bs-btn-bg)", 
                  color:"white" }}
                  > Log out
                  </Nav.Link> 
                ) : ( 
                  <Nav.Link href="/#/login">Login</Nav.Link>
                  )
                }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Cart show={show} handleClose={handleClose}/>
    </div>
  );
};

export default NavBar;
