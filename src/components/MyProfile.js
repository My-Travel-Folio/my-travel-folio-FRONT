import React from 'react'
import NewTravelForm from './NewTravelForm'
import MyTravels from './MyTravels'



//DEPENDENCIAS
import TravelService from '../services/TravelService';
import {Container, Col, Row, Button, Card, Spinner} from 'react-bootstrap'

// import NewTravelForm from './NewTravelForm';

class MyProfile extends React.Component {

    state={
        showNewTravelForm:  false,
        showAllTravels: false, 
        allTravels: [],
    }

    //Conexión Travel Service
    travelService = new TravelService();

            // GET DATA FROM DB

    getTravelData = ()=>{
        this.travelService.getAllTravels(this.props.isLogged._id)
        .then((response)=>{
            this.setState({allTravels: response})
        })
        .then(() => {
            this.handleAllTravels()
        })
    }
        
    // LIFECYCLE METHODS

    componentDidMount() {
        this.getTravelData()
    }

                  // HANDLE FUNCTIONS

    //Función Botón Add New Travel

    handleNewTravelForm = async ()=>{
        await this.getTravelData(this.props.isLogged._id)
        this.setState({showNewTravelForm: !this.state.showNewTravelForm})
    }

    //Función Botón All Travels


    handleAllTravels = ()=>{
        this.setState(
            {showAllTravels: true}
        )
    }

                // RENDER

    render(){

        const buttonText = !this.state.showNewTravelForm ? 'ADD NEW TRAVEL' : 'SHOW ALL TRAVELS'
        
        if(this.state.showNewTravelForm) {
            return(
                <Container>
                    <Row className="mt-4">
                        <Col>
                            <Row className="mx-auto">
                                <Col>
                                    <h4>{this.props.isLogged.email && `Welcome to Travel Folio, ${this.props.isLogged.name}`}</h4>
                                </Col>
                            </Row>

                            <Row className="mx-auto mt-3">
                                <Col>
                                    <Button variant="dark" className="text-center" onClick={this.handleNewTravelForm}>{buttonText}</Button>
                                </Col>
                            </Row>

                            <Row className="mx-auto">
                                <Col>
                                    <Card className="mt-4 mb-5 p-4 text-center" >
                                        <Card.Body>
                                            <NewTravelForm isLogged={this.props.isLogged} checkIfLoggedIn={this.props.checkIfLoggedIn}/>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            )
        } else {
            if(this.state.showAllTravels){
                return(
                    <Container>
                        <Row className="mt-4">
                            <Col>
                                <Row className="mx-auto">
                                    <Col>
                                        <h4>{this.props.isLogged.email && `Welcome to Travel Folio, ${this.props.isLogged.name}`}</h4>
                                    </Col>
                                </Row>

                            <Row className="mx-auto mt-3">
                                <Col>
                                    <Button variant="dark" className="text-center" onClick={this.handleNewTravelForm}>{buttonText}</Button>
                                </Col>
                            </Row>

                            <Row className="mx-auto">
                                <Col>
                                    <Card className="mt-4 mb-5 p-4 text-center" >
                                        <Card.Body>
                                            <MyTravels allTravels={this.state.allTravels} getTravelData={this.getTravelData} />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                )
            } else {
                return(
                    <Container>
                        <Row className="mt-4">
                            <Col>
                                <Row className="mx-auto">
                                    <Col>
                                        <h4>{this.props.isLogged.email && `Welcome to Travel Folio, ${this.props.isLogged.name}`}</h4>
                                    </Col>
                                </Row>

                                <Row className="mx-auto mt-3">
                                    <Col>
                                        <Button variant="dark" className="text-center" onClick={this.handleNewTravelForm}>{buttonText}</Button>
                                    </Col>
                                </Row>

                                <Row className="mx-auto">
                                    <Col>
                                        <Card className="mt-4 mb-5 p-4 text-center" >
                                            <Card.Body>
                                                <Spinner animation="border" />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                )
            }
        }
    }
}

export default MyProfile