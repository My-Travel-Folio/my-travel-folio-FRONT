import React from 'react'
import NewTravelForm from './NewTravelForm'
import MyTravels from './MyTravels'

//DEPENDENCIAS
import TravelService from '../services/TravelService';

// import NewTravelForm from './NewTravelForm';

class MyProfile extends React.Component {

    state={
        showNewTravelForm:  false,
        showAllTravels: false, 
        allTravels: []
    }

    //Conexión Travel Service
    service = new TravelService();

    //Función Botón Add New Travel

    handleNewTravelForm = ()=>{
        this.setState(
            {showNewTravelForm: !this.state.showNewTravelForm}
        )
    }

    //Función Botón All Travels

    handleAllTravels = ()=>{
        this.setState(
            {showAllTravels: !this.state.showAllTravels}
        )
    }
    
    //Función para recibir todos los viajes
    getTravelData = ()=>{
        this.service.getAllTravels(this.props.isLogged._id)
        .then((response)=>{
        
            this.setState({allTravels: response})
        })
    }

    componentDidMount() {
        this.getTravelData()
    }

    render(){
        return(
            <div>
                <h2>My Profile</h2>
                <p>Upcoming travels</p>
                <p>Past travels</p>
                <h3>{this.props.isLogged.email && `Welcome, ${this.props.isLogged.name}`}</h3>
                <br/>
                <button onClick={this.handleNewTravelForm}>Add New Travel</button>
                <br/>
                <button onClick={this.handleAllTravels}>My Travels</button>
                <br/>
                {this.state.showNewTravelForm && <NewTravelForm />}
                <br/>
                {this.state.showAllTravels && <MyTravels />}

          
            </div>
        )
    }
}

export default MyProfile