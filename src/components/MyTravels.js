import React from 'react'

//DEPENDENCIAS
import TravelService from '../services/TravelService'
import FileService from '../services/FileService';
import MySingleTravel from './MySingleTravel'
import {Container, Row, Col, ListGroup, Button} from 'react-bootstrap'

class MyTravels extends React.Component {

  state={
      singleTravel: {},
      mySingleTravelFiles: [],
      allTravels: this.props.allTravels
    }

    //Conexión Travel & File Service
    travelService = new TravelService();
    fileService = new FileService();
  
            // GET DATA FROM DB
            
  // SINGLE TRAVEL INFO
  getSingleTravelData = (_id, responseTravelFiles)=>{
    this.travelService.getTravel(_id)
    .then((responseSingleTravel)=>{
        this.setState({singleTravel: responseSingleTravel, mySingleTravelFiles: responseTravelFiles})
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  // SINGLE TRAVEL FILES INFO
  getFilesData = (travelID)=>{
    this.fileService.getTravelFiles(travelID)
    .then((responseTravelFiles)=>{
      this.getSingleTravelData(travelID, responseTravelFiles)
    })
  }

  // EMPTY STATE & GET TRAVEL DATA AGAIN
  clearSingleTravel = async () => {
    await this.setState({mySingleTravelFiles: []})
    await this.props.getTravelData()
    this.setState({singleTravel: {}})
    
  }

  //          RENDER

  render() {

    if(!this.state.singleTravel._id) {
      return (

          <div>
            <Container>
              <Row >
                <Col lg="6" className="mx-auto">
                  <h3>MY TRAVELS</h3>
                  <ListGroup className="my-travels-list">
                    
                    
                    {this.props.allTravels.sort((a, b)=> new Date(a.startDate) - new Date(b.startDate)).map((travel, index)=>(
                    <ListGroup.Item
                      key={index}
                      onClick={()=>this.getFilesData(travel._id)}
                      action
                      >
                        <p>{travel.travelName}</p>
                        <p>{travel.startDateFixed}</p>
                    </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
            </Container>


          </div>

      )
    } else {
      return(
        <div> 
          <Button className="mb-3" onClick={this.clearSingleTravel}>Back to my travels</Button>
          <h2>{this.state.singleTravel.travelName}</h2>
          <h5>{this.state.singleTravel.startDateFixed} - {this.state.singleTravel.endDateFixed}</h5>
          <MySingleTravel singleTravel={this.state.singleTravel} mySingleTravelFiles={this.state.mySingleTravelFiles} getFilesData={this.getFilesData}/>
        </div>
        
      )  
    }  
  }
}

export default MyTravels