import React from 'react'
import DatePicker from 'react-datepicker'

//DEPENDENCIAS
import TravelService from '../services/TravelService';


class NewTravelForm extends React.Component {

  state={
    newTravel: {
      userID: this.props.isLogged._id,
      travelName: '',
      startDate: new Date(), 
      endDate: new Date(),
      startDateFixed: '',
      endDateFixed: ''
    },
  }

  //Conexión Travel Service
  service = new TravelService();

  //NEW TRAVEL FORM CONFIG

  submitNewTravel = (event) => {
    event.preventDefault();
      this.service.newTravel(
        this.state.newTravel.userID,
        this.state.newTravel.travelName,
        this.state.newTravel.startDate,
        this.state.newTravel.endDate)
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

  onChangeStart = (date) =>{
    const start = date
    this.setState({newTravel: { ...this.state.newTravel, startDate: start}}) 
  }

  onChangeEnd = (date) =>{
    const end = date
    this.setState({newTravel: { ...this.state.newTravel, endDate: end}}) 
  }

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

        <div>
          <DatePicker
            selected={this.state.newTravel.startDate}
            onChange={this.onChangeStart}
            dateFormat="dd/MM/yyyy"
           />
            <DatePicker
            selected={this.state.newTravel.endDate}
            onChange={this.onChangeEnd}
            dateFormat="dd/MM/yyyy"
           />
    
        </div>

        <button type="submit">Add New Travel</button>

      </form>

    </div>
  )
  }

}

export default NewTravelForm