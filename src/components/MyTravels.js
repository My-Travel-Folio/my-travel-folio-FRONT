import React from 'react'

//DEPENDENCIAS
import TravelService from '../services/TravelService'
import FileService from '../services/FileService';
import MySingleTravel from './MySingleTravel'

class MyTravels extends React.Component {

  state={
    showSingleTravel: false,
    singleTravel: '',
    singleTravelID: '',
    mySingleTravelFiles: ''
  }

  //Conexión Travel Service
  service = new TravelService();
  service = new FileService();
  

  getSingleTravelData = ()=>{
    this.service.getTravel(this.state.singleTravelID)
    .then((response)=>{
        this.setState({singleTravel: response})
    })
  }

  getFilesData = ()=>{
    this.service.getTravelFiles(this.state.singleTravelID)
    .then((response)=>{
        this.setState({mySingleTravelFiles: response})
    })
  }

  handleSingleTravel = (travelID)=>{
    this.setState(
        {singleTravelID: travelID}
    ) 
    setTimeout (() => {
      this.getSingleTravelData()
      this.getFilesData()
    }, 100)
  }

  render() {
    return(
      <div>
          <h2>My Travels</h2>
          {this.props.allTravels.map((travel, index)=>(
            <button
            key={index}
            onClick={()=>this.handleSingleTravel(travel._id)}
            >
              <div>
                <p>{travel.travelName}</p>
                <p>{travel.startDate}</p>
              </div>     
            </button>
          ))}
        <br />
        {this.state.singleTravel && <MySingleTravel singleTravel={this.state.singleTravel} mySingleTravelFiles={this.state.mySingleTravelFiles}/>}
      </div>
    )    
  }
}

export default MyTravels