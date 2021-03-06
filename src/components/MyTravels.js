import React from 'react'
import './MyTravels.css'

//DEPENDENCIAS
import TravelService from '../services/TravelService'
import FileService from '../services/FileService';
import MySingleTravel from './MySingleTravel'
import {Container, Row, Col, ListGroup, Button} from 'react-bootstrap'

class MyTravels extends React.Component {

  state={
      singleTravel: {},
      mySingleTravelFiles: [],
      // allTravels: this.props.allTravels,
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
      return err
    })
  }

  //AQUI ---------------------------
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
    await this.setState({singleTravel: {}})
    this.props.getTravelData()
  }

  //          RENDER

  render() {
    

    if(!this.state.singleTravel._id && this.props.allTravels.length !== 0) {
      return (

          <div>
            <Container>
              <Row >
                <Col lg="6" className="mx-auto">

                  <Row>
                    <Col className="mb-3">
                      <h3>MY TRAVELS</h3>                     
                    </Col>
                  </Row>

                  <ListGroup className="my-travels-list ">
                    
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
    } else if (this.state.singleTravel._id && this.props.allTravels.length !== 0){
      return(
        <div> 
          <Button className="mb-3" variant="outline-primary" onClick={this.clearSingleTravel}>SHOW ALL MY TRAVELS</Button>
          <h2>{this.state.singleTravel.travelName}</h2>
          <h5>{this.state.singleTravel.startDateFixed} - {this.state.singleTravel.endDateFixed}</h5>
          <MySingleTravel singleTravel={this.state.singleTravel} mySingleTravelFiles={this.state.mySingleTravelFiles} getFilesData={this.getFilesData} clearSingleTravel={this.clearSingleTravel}/>
        </div>
      )  

    } else if (this.props.allTravels.length === 0 && !this.state.singleTravel._id){
      return(
         <div>
          <Container>
            <Row>
              <Col>
                  <p>You haven't added any travels yet. Add your next destination so you can organize all your files.</p>
              </Col>
            </Row>
          </Container>
         </div> 

      )

    }
  }
}

export default MyTravels