import React from 'react'
import './Home.css'
import {Container, Row, Col, Card} from 'react-bootstrap'


// import {Container, Row, Col, Button, ListGroup, Alert, DropdownButton, Dropdown} from 'react-bootstrap'

const Home = (props)=>{
  return(
    <div>

    <Container className="home-container mt-4">
      <Row className="home-row">
        <Col lg="6" md="8" className="mx-auto">

          <Row>
            <Col className="mt-5">
              <Card className="p-4 home-cards">
                <Card.Title>STEP 1:</Card.Title>
                <Card.Text>ADD YOUR TRAVEL</Card.Text>
              </Card>
            </Col>
          </Row>


          <Row>
            <Col className="mt-5">
              <Card className="p-4 home-cards">
                <Card.Title>STEP 2:</Card.Title>
                <Card.Text>UPLOAD YOUR TICKETS & RESERVATIONS</Card.Text>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col className="mt-5">
              <Card className="p-4 home-cards">
                <Card.Title>STEP 3:</Card.Title>
                <Card.Text>MAKE YOUR BACKPACK AND YOU’RE READY TO GO!</Card.Text>
              </Card>
            </Col>
          </Row>



        </Col>
      </Row>
    </Container>

    </div>

  )
}

export default Home