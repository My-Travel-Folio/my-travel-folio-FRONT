import React from 'react'
import NewTravelForm from './NewTravelForm'

//DEPENDENCIAS

// import NewTravelForm from './NewTravelForm';

class MyProfile extends React.Component {

    state={
        showNewTravelFormValue:  false 
    }

    //Función Botón Add New Travel
    handleNewTravelForm = ()=>{
        this.setState(
            {showNewTravelFormValue: !this.state.showNewTravelFormValue}
        )
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
                {this.state.showNewTravelFormValue && <NewTravelForm />}
          
            </div>
        )
    }
}

export default MyProfile