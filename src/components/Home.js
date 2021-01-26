import React from 'react'
import './Home.css'
import {Container, Row, Col, Card, Button, Modal} from 'react-bootstrap'


// import {Container, Row, Col, Button, ListGroup, Alert, DropdownButton, Dropdown} from 'react-bootstrap'

class Home extends React.Component {
  
  state={
    show: true
  }


  handleClose (){
    this.setState({ show: false });
  };

  render() {
    
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

            <Row>
              <Col>

              <Modal centered show={this.state.show} onHide={()=>this.handleClose()}>
                  <Modal.Header >
                      <Modal.Title>Instructions</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <p>Sign up to organize and check your travel files. If you prefer, use this example account:</p>
                  <ul>
                    <li><b>Email:</b> andrea@mytravelfolio.com</li>
                    <li><b>Password:</b> mytravelfolio</li>
                  </ul>
                  
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={()=>this.handleClose()}>Close</Button>
                  </Modal.Footer>
              </Modal>

              </Col>
            </Row>



          </Col>
        </Row>
      </Container>

      </div>

  )
}
}

export default Home