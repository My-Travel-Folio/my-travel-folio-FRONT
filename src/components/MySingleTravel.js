import React from 'react'
import NewFileForm from './NewFileForm'
import SingleFile from './SingleFile'

//DEPENDENCIAS
import FileService from '../services/FileService';
import TravelService from '../services/TravelService'
import {Container, Row, Col, ButtonGroup, Button, ListGroup, Alert} from 'react-bootstrap'


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
            console.log("Travel removed")
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
        console.log(travelID)
        this.deleteTravel(travelID)
    }

    // LIFECYCLE METHODS

    // componentDidMount() {
    //     this.getSingleFile(this.state.singleFile._id)
    // }

    render() {
                        // ESTO CÓMO PUEDE SER QUE ESTÉ FUNCIONANDO AL REVÉS???

        if(!this.state.showNewFileForm) {        
            if(this.state.showSingleFile) {
                return (
                    <div>
                        <Button onClick={this.handleSingleFile}>ALL FILES</Button>
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
                                    <Button onClick={this.handleNewFileForm}>Add file</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-2 mb-2">
                                    <p>CATEGORIES FILTER:</p>
                                    <ButtonGroup  className="mb-2">
                                        <Button variant="outline-danger" onClick={this.handleSearchTravelFilesHotel}>Hotel Reservation</Button>
                                        <Button variant="outline-info" onClick={this.handleSearchTravelFilesExperience}>Experience Ticket</Button>
                                        <Button onClick={this.handleSearchTravelFilesTransport}>Transport Ticket</Button>
                                        <Button onClick={this.handleSearchTravelFilesOther}>Other</Button>
                                        <Button onClick={this.handleRestartFilters}>Restart Filters</Button>  
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="6" className="mx-auto">
                                    <ListGroup className="">
                                        <ListGroup.Item>
                                            <h4>MY FILES</h4>
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
                                    <Alert variant="danger">
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
                    <NewFileForm singleTravelID={this.props.singleTravel._id}/>
                    <Button onClick={()=>this.handleBackToTravel(this.props.singleTravel._id)}>Back to {this.props.singleTravel.travelName}</Button>
                </div>
            )
        }     
    }
}

export default MySingleTravel