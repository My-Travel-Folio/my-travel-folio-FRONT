import React from 'react'
import DatePicker from 'react-datepicker'

//DEPENDENCIAS
import TravelService from '../services/TravelService';
import {Container, Col, Row, Form, Button, Card, Alert} from 'react-bootstrap'


class NewTravelForm extends React.Component {

  state={
    newTravel: {
      userID: this.props.isLogged._id,
      travelName: '',
      startDate: new Date(), 
      endDate: new Date(),
      startDateFixed: '',
      endDateFixed: ''
    },
    showMessage: false
  }

  //Conexión Travel Service
  service = new TravelService();

  //NEW TRAVEL FORM CONFIG

  submitNewTravel = (event) => {
    event.preventDefault();
      this.service.newTravel(
        this.state.newTravel.userID,
        this.state.newTravel.travelName,
        this.state.newTravel.startDate,
        this.state.newTravel.endDate,
        this.state.newTravel.startDateFixed,
        this.state.newTravel.endDateFixed)
      .then(() => {
        // this.props.checkIfLoggedIn();
        this.handleShowMessage()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeHandlerNewTravel = (_eventTarget) => {
		this.setState({ newTravel: { ...this.state.newTravel, [_eventTarget.name]: _eventTarget.value } });
  };

  onChangeStart = (date) =>{
    const start = date

    const year = start.getFullYear()
    const month = start.getMonth() + 1
    const day = start.getDate()

    const newStartDateFixed = `${day}/${month}/${year}`

    this.setState({newTravel: { ...this.state.newTravel, startDateFixed: newStartDateFixed, startDate: start, endDate: start}}) 
  }

  onChangeEnd = (date) =>{

    const end = date

    const year = end.getFullYear()
    const month = end.getMonth() + 1
    const day = end.getDate()

    const newEndDateFixed = `${day}/${month}/${year}`

    this.setState({newTravel: { ...this.state.newTravel, endDateFixed: newEndDateFixed, endDate: end}}) 
  }

  getFixedStartDate = () => {
    const start = this.state.newTravel.startDate
    const year = start.getFullYear()
    const month = start.getMonth() + 1
    const day = start.getDate()

    const newStartDateFixed = `${day}/${month}/${year}`
    
    return this.setState({newTravel: { ...this.state.newTravel, startDateFixed: newStartDateFixed}})
  }

  getFixedEndDate = () => {
    const end = this.state.newTravel.endDate
    const year = end.getFullYear()
    const month = end.getMonth() + 1
    const day = end.getDate()

    const newEndDateFixed = `${day}/${month}/${year}`
    
    return this.setState({newTravel: { ...this.state.newTravel, endDateFixed: newEndDateFixed}})
  }  

  handleShowMessage = () => {
    return this.setState({showMessage: !this.state.showMessage})
  }

  componentDidMount = async () => {
    await this.getFixedStartDate()
    this.getFixedEndDate()
  }

  render(){

    if(!this.state.showMessage) {
      return(

        <div>
          <Container>

            <Row>
              <Col className="text-center">
                <h2>New Travel</h2>
              </Col>
            </Row>

            <Row>
              <Col lg="6" className="mx-auto mt-4">
                <Card className="p-4 text-left">

                  <Form onSubmit={this.submitNewTravel}>
                    <Row>
                      <Col>

                        <Form.Group>
                          <Form.Label htmlFor="travelName">Travel Name: </Form.Label>
                            <Form.Control
                              required
                              type="text" 
                              name="travelName" 
                              value={this.state.newTravel.travelName} 
                              onChange={(event)=>this.changeHandlerNewTravel(event.target)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                          <Row>
                            <Col>
                              <Form.Label>Dates: </Form.Label>
                            </Col>
                          </Row>

                          <Row className="text-center">
                            <Col className="ml-3">
                              <DatePicker
                                selected={this.state.newTravel.startDate}
                                onChange={this.onChangeStart}
                                dateFormat="dd/MM/yyyy"
                              />
                            </Col>

                            <Col className="mr-3">
                              <DatePicker
                                selected={this.state.newTravel.endDate}
                                onChange={this.onChangeEnd}
                                dateFormat="dd/MM/yyyy"
                              />
                            </Col>
                          </Row>
                        </Form.Group>

                      </Col>
                    </Row>

                      <Row>
                        <Col className="text-center">
                          <Button type="submit">Add New Travel</Button>
                        </Col>
                      </Row>

                  </Form>

                </Card>
              </Col>
            </Row>
          </Container>
        </div>

      )

    } else {
      return (
        <div>
          <Container>
            <Row>
              <Col>
                <Alert variant="success">
                  Your travel has been added successfully.
                </Alert>
              </Col>
            </Row>
          </Container>
        </div>
      )
    }
  }
}

export default NewTravelForm