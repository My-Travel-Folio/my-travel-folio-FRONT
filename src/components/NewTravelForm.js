import React from 'react'

//DEPENDENCIAS
import TravelService from '../services/TravelService';


class NewTravelForm extends React.Component {

  state={
    newTravel: {userID: this.props.isLogged._id, travelName: '', startDate: '', finishDate: ''}
  }

  //Conexión Travel Service
  service = new TravelService();

  //NEW TRAVEL FORM CONFIG

  submitNewTravel = (event) => {
    event.preventDefault();
      this.service.newTravel(this.state.newTravel.userID, this.state.newTravel.travelName, this.state.newTravel.startDate, this.state.newTravel.finishDate)
      .then(() => {
        this.props.checkIfLoggedIn();
      })
      .catch((err) => {
        console.log(err);
      });
  }


  changeHandlerNewTravel = (_eventTarget) => {
		this.setState({ newTravel: { ...this.state.newTravel, [_eventTarget.name]: _eventTarget.value } });
  };
  


  render(){
      return(
    <div>
      
      <h2>Soy el formulario para un travel nuevo</h2>

      <form onSubmit={this.submitNewTravel}>

        <label htmlFor="travelName">Travel Name: </label>
        <input 
          type="text" 
          name="travelName" 
          value={this.state.newTravel.travelName} 
          onChange={(event)=>this.changeHandlerNewTravel(event.target)}
        />

        <label htmlFor="startDate">Start Date: </label>
        <input 
          type="text" 
          name="startDate" 
          value={this.state.newTravel.startDate} 
          onChange={(event)=>this.changeHandlerNewTravel(event.target)}
        />

        <label htmlFor="finishDate">Finish Date: </label>
        <input 
          type="text" 
          name="finishDate" 
          value={this.state.newTravel.finishDate} 
          onChange={(event)=>this.changeHandlerNewTravel(event.target)}
        />

        <button type="submit">Add New Travel</button>

      </form>

    </div>
  )
  }

}

export default NewTravelForm