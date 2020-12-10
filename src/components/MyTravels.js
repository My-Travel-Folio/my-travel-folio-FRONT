import React from 'react'

//DEPENDENCIAS
import TravelService from '../services/TravelService'
import MySingleTravel from './MySingleTravel'

class MyTravels extends React.Component {

  state={
    showSingleTravel: false,
    singleTravel: '',
    singleTravelID: ''
  }

  //Conexión Travel Service
  service = new TravelService();

  getSingleTravelData = ()=>{
    this.service.getTravel(this.state.singleTravelID)
    .then((response)=>{
        this.setState({singleTravel: response})
    })
  }

  handleSingleTravel = (travelID)=>{
    this.setState(
        {singleTravelID: travelID}
    ) 
    setTimeout (() => {
      this.getSingleTravelData()
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
        {this.state.singleTravel && <MySingleTravel singleTravel={this.state.singleTravel} />}
      </div>
    )    
  }
}

export default MyTravels