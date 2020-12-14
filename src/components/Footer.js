import React from 'react'

//DEPENDENCIAS
// import { Link } from 'react-router-dom';
import {Navbar, Nav,} from 'react-bootstrap'

const Footer = ()=>{

    return(
        <div>
        
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="bottom">
                  <Nav className="mx-auto">
                    <Nav.Item className="text-light">
                      This Is Us
                    </Nav.Item>
                  </Nav>
            </Navbar>
        </div>
      )
}

export default Footer