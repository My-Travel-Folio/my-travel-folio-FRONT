import React from 'react'

//DEPENDENCIAS
import TravelService from '../services/TravelService'
import MySingleTravel from './MySingleTravel'
// import { Link } from 'react-router-dom';

class MyTravels extends React.Component {

  state={
    showSingleTravel: false,
    singleTravel: ''
  }

  //Conexión Travel Service
  service = new TravelService();

  getSingleTravelData = ()=>{
    this.service.getTravel(this.props.allTravels._id)
    .then((response)=>{
        this.setState({singleTravel: response})
    })
  }

  componentDidMount() {
    this.getSingleTravelData()
  }

  handleSingleTravel = ()=>{
    this.setState(
        {showSingleTravel: !this.state.showSingleTravel, }
    )
  }

  render() {
    return(
      <div>
          <h2>My Travels</h2>
          {this.props.allTravels.map((travel, index)=>(
            <button onClick={this.handleSingleTravel} key={index}>
              <div>
                <p>{travel.travelName}</p>
                <p>{travel.startDate}</p>
              </div>     
            </button>
          ))}
        <br />
        {this.state.showSingleTravel && <MySingleTravel singleTravel={this.state.singleTravel} />}
      </div>
    )    
  }
}

export default MyTravels