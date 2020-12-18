import React from 'react'
import NewFileForm from './NewFileForm'
import SingleFile from './SingleFile'

//DEPENDENCIAS
import FileService from '../services/FileService';
import TravelService from '../services/TravelService'
import {Container, Row, Col, Button, ListGroup, Alert, DropdownButton, Dropdown} from 'react-bootstrap'


class MySingleTravel extends React.Component {

    state= {
        showSingleFile: false,
        showNewFileForm: false, 
        singleFile: '',
        mySingleTravelFiles: this.props.mySingleTravelFiles,
        filteredFiles: this.props.mySingleTravelFiles,
        deleteMessage: false
    }

    //Conexión Travel & File Service
    travelService = new TravelService();
    fileService = new FileService();

    //          GET DATA FROM DB
            
    // SINGLE FILE INFO
    getSingleFile = (_id)=>{
        this.fileService.getFile(_id)
        .then((response)=>{
            this.setState({singleFile: response})
        })
    }

    // GET SINGLE TRAVEL FILES
    getFilesData = (travelID)=>{
        this.fileService.getTravelFiles(travelID)
        .then((response)=>{
            this.setState({mySingleTravelFiles: response, filteredFiles: response})
            
        })
      }

    // DELETE TRAVEL

    deleteTravel = (travelID) =>{
        this.travelService.deleteTravel(travelID)
        .then(()=>{
            this.setState({deleteMessage: true})
        })
    }

    //          HANDLE FUNCTIONS

    //HOTEL FILTER
    handleSearchTravelFilesHotel = () => {
        const hotelReservation = this.state.mySingleTravelFiles.filter((file) => (
            file.category === 'Hotel Reservation'
        ))
        this.setState({filteredFiles: hotelReservation})
    }

    //EXPERIENCE FILTER
    handleSearchTravelFilesExperience = () => {
        const experience = this.state.mySingleTravelFiles.filter((file) => (
            file.category === 'Experience Ticket'
        ))
        this.setState({filteredFiles: experience})
    }

    //TRANSPORT FILTER
    handleSearchTravelFilesTransport = () => {
        const transport = this.state.mySingleTravelFiles.filter((file) => (
            file.category === 'Transport Ticket'
        ))
        this.setState({filteredFiles: transport})
    }

    //OTHER FILTER
    handleSearchTravelFilesOther = () => {
        const other = this.state.mySingleTravelFiles.filter((file) => (
            file.category === 'Other'
        ))
        this.setState({filteredFiles: other})
    }

    //RESTART FILTERS
    handleRestartFilters = () => {
        this.getFilesData(this.props.singleTravel._id)
    }

    //SHOW FILE FORM
    handleNewFileForm = ()=>{
        this.setState(
            {showNewFileForm: !this.state.showNewFileForm}
        )
    }
    
    // SHOW SINGLE FILE
    handleSingleFile = async (fileID)=>{
        const travelID = this.props.singleTravel._id
        await this.getSingleFile(fileID)
        await this.getFilesData(travelID)
        this.setState( {showSingleFile: !this.state.showSingleFile})
    }

    handleBackToTravel = async (travelID)=> {
        await this.getFilesData(travelID)
        this.setState({showNewFileForm: !this.state.showNewFileForm})
    }

    handleDeleteTravel = (travelID)=>{
        this.deleteTravel(travelID)
    }


    render() {
                        // ESTO CÓMO PUEDE SER QUE ESTÉ FUNCIONANDO AL REVÉS???

        if(!this.state.showNewFileForm) {        
            if(this.state.showSingleFile) {
                return (
                    <div>
                        <Button className="mt-2" variant="outline-primary" onClick={this.handleSingleFile}>SHOW ALL FILES</Button>
                        <SingleFile singleFile={this.state.singleFile} singleTravelID={this.props.singleTravel._id} />
                    </div>
                )
            } else if (!this.state.showSingleFile && !this.state.deleteMessage){
                return (
                    <div>
                        <Container>

                            <Row>
                                <Col className="mt-2 mb-2">
                                    <Button variant="outline-danger" onClick={()=>this.handleDeleteTravel(this.props.singleTravel._id)}>Delete Travel</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-2 mb-2">

                                    <DropdownButton className="mb-3" variant="outline-secondary" id="dropdown-basic-button" title="CATEGORIES FILTERS" >
                                        <Dropdown.Item onClick={this.handleSearchTravelFilesHotel}>Hotel Reservation</Dropdown.Item>
                                        <Dropdown.Item onClick={this.handleSearchTravelFilesExperience}>Experience Ticket</Dropdown.Item>
                                        <Dropdown.Item onClick={this.handleSearchTravelFilesTransport}>Transport Ticket</Dropdown.Item>
                                        <Dropdown.Item onClick={this.handleSearchTravelFilesOther}>Other</Dropdown.Item>
                                        <Dropdown.Item onClick={this.handleRestartFilters}>Restart Filters</Dropdown.Item>
                                    </DropdownButton>
                                   
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="6" className="mx-auto">
                                    <ListGroup className="">
                                        <ListGroup.Item action>
                                            <h4 onClick={this.handleNewFileForm}>ADD A NEW FILE</h4>
                                        </ListGroup.Item>
                                            {this.state.filteredFiles.sort((a, b)=> new Date(a.date) - new Date(b.date)).map((singleFile, index)=>(
                                            <ListGroup.Item 
                                                key={index}
                                                onClick={()=>this.handleSingleFile(singleFile._id)}
                                                action
                                                >
                                                <p>{singleFile.fileName}</p>
                                                <p>{singleFile.fixedDate}</p>
                                            </ListGroup.Item>    
                                        ))}
                                        </ListGroup>
                                </Col>
                            </Row>
                        </Container>

                    </div>
                )
            } else if (this.state.deleteMessage && !this.state.showSingleFile){
                return(
                    <div>
                        <Container>
                            <Row>
                                <Col>
                                    <Alert className="mt-4" variant="danger">
                                    Your travel has been removed successfully.
                                    </Alert>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )
            } 
        } else if(this.state.showNewFileForm) {
            return(
                <div>
                    <Button className="mt-3" variant="outline-secondary" onClick={()=>this.handleBackToTravel(this.props.singleTravel._id)}>Back to {this.props.singleTravel.travelName}</Button>
                    <NewFileForm singleTravelID={this.props.singleTravel._id}/>
                    
                </div>
            )
        }     
    }
}

export default MySingleTravel