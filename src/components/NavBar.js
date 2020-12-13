import React from 'react'

//DEPENDENCIAS
import { Link } from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap'

const NavBar = (props)=>{


    return(
        <div>

          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand href="#home">My Travel Folio</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                  <Nav className="ml-auto">
                    <Nav.Item >
                      {!props.isLogged.email && <Nav.Link eventKey="1" as={Link} to="/login">Log In</Nav.Link>}
                    </Nav.Item>
                    <Nav.Item >
                      {!props.isLogged.email && <Nav.Link eventKey="2" as={Link} to="/signup">Sign Up</Nav.Link>}
                    </Nav.Item>
                    <Nav.Item >
                      {props.isLogged.email && <Nav.Link eventKey="3" onClick={()=>props.logOut()}>Log Out</Nav.Link>}
                    </Nav.Item>
                  </Nav>
                </Navbar.Collapse>

                

            </Navbar>
        </div>
      )
}

export default NavBar