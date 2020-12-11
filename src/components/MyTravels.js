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
  

  getSingleTravelData = (_id)=>{
    this.service.getTravel(_id)
    .then((response)=>{
        this.setState({singleTravel: response})
    })
  }

  clearSingleTravel = () => {
    this.setState({singleTravel: ''})
  }

  getFilesData = (travelID)=>{
    this.service.getTravelFiles(travelID)
    .then((response)=>{
        this.setState({mySingleTravelFiles: response})
    })
  }

  handleSingleTravel = (travelID)=>{
    
      this.getSingleTravelData(travelID)
  
      this.getFilesData(travelID)
  }


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
          <MySingleTravel singleTravel={this.state.singleTravel} mySingleTravelFiles={this.state.mySingleTravelFiles}/>
        </div>
        
      )  
    }  
  }
}

export default MyTravels