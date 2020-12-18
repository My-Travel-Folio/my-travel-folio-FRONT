import React from 'react'
import './Footer.css'

//DEPENDENCIAS
// import { Link } from 'react-router-dom';
import {Navbar, Nav,} from 'react-bootstrap'

const Footer = ()=>{

    return(
        <div>
      
          <Navbar className="mt-5" collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="bottom">
                  <Nav className="mx-auto">
                    <Nav.Item className="text-light footer">
                       © My Travel Folio, 2020
                    </Nav.Item>
                  </Nav>
            </Navbar>
        </div>
      )
}

export default Footer