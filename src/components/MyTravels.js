import React from 'react'

//DEPENDENCIAS
import TravelService from '../services/TravelService'
import FileService from '../services/FileService';
import MySingleTravel from './MySingleTravel'

class MyTravels extends React.Component {

  state={
    // showSingleTravel: false,
    singleTravel: {},
    mySingleTravelFiles: []
  }

  //Conexión Travel Service
  service = new TravelService();
  service = new FileService();
  
            // GET DATA FROM DB
            
  // SINGLE TRAVEL INFO
  getSingleTravelData = (_id, responseTravelFiles)=>{
    this.service.getTravel(_id)
    .then((responseSingleTravel)=>{
        this.setState({singleTravel: responseSingleTravel, mySingleTravelFiles: responseTravelFiles})
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  // SINGLE TRAVEL FILES INFO
  getFilesData = (travelID)=>{
    this.service.getTravelFiles(travelID)
    .then((responseTravelFiles)=>{
      this.getSingleTravelData(travelID, responseTravelFiles)
    })
  }

  // EMPTY STATE
  clearSingleTravel = () => {
    this.setState({singleTravel: ''})
  }

  //          RENDER

  render() {

    if(!this.state.singleTravel._id) {
      return (
        <div>
          <h2>My Travels</h2>
          {this.props.allTravels.map((travel, index)=>(
            <button
              key={index}
              onClick={()=>this.getFilesData(travel._id)}>
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