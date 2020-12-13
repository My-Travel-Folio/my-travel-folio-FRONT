import React from 'react'

//DEPENDENCIAS
import TravelService from '../services/TravelService'
import FileService from '../services/FileService';
import MySingleTravel from './MySingleTravel'

class MyTravels extends React.Component {

  state={
    // showSingleTravel: false,
    singleTravel: '',
    mySingleTravelFiles: ''
  }

  //Conexión Travel Service
  service = new TravelService();
  service = new FileService();
  
            // GET DATA FROM DB
            
  // SINGLE TRAVEL INFO
  getSingleTravelData = (_id)=>{
    this.service.getTravel(_id)
    .then((response)=>{
        this.setState({singleTravel: response})
    })
  }

  // SINGLE TRAVEL FILES INFO
  getFilesData = (travelID)=>{
    this.service.getTravelFiles(travelID)
    .then((response)=>{
        this.setState({mySingleTravelFiles: response})
    })
  }


  //      LIFECYLE METHODS
  componentDidMount() {
    this.getSingleTravelData()
    // this.getFilesData()
  }

  // EMPTY STATE
  clearSingleTravel = () => {
    this.setState({singleTravel: ''})
  }

  //      HANDLE FUNCTIONS

  handleSingleTravel = (travelID)=>{
    this.getSingleTravelData(travelID)
    this.getFilesData(travelID)
  }

  //          RENDER

  render() {

    if(!this.state.singleTravel) {
      return (
        <div>
          <h2>My Travels</h2>
          {this.props.allTravels.map((travel, index)=>(
            <button
              key={index}
              onClick={()=>this.handleSingleTravel(travel._id)}>
              <div>
                <p>{travel.travelName}</p>
                <p>{travel.startDate}</p>
              </div>     
            </button>
          ))}
        </div>
      )
    } else {
      return(
        <div>
          <h2>My Single Travel</h2>
          <button onClick={this.clearSingleTravel}>Back to my travels</button>
          <MySingleTravel singleTravel={this.state.singleTravel} mySingleTravelFiles={this.state.mySingleTravelFiles} getFilesData={this.getFilesData}/>
        </div>
        
      )  
    }  
  }
}

export default MyTravels