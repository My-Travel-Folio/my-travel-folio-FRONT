import React from 'react'

//DEPENDENCIAS
import UserService from '../services/UserService';

class SignUp extends React.Component {
  // const {submitSignUp, newUser, changeHandlerSignUp} = props
  state={
    newUser: { name: '', lastName: '', email:'', password: '' },
  }

  service = new UserService();
  

  //SIGNUP CONFIG
	submitSignUp = (event) => {
		event.preventDefault();
    	this.service.signup(this.state.newUser.name, this.state.newUser.lastName, this.state.newUser.email, this.state.newUser.password)
		.then((result) => {
			this.props.checkIfLoggedIn();
		})
		.catch((err) => {
			console.log(err);
		});
	};

	changeHandlerSignUp = (_eventTarget) => {
		this.setState({ newUser: { ...this.state.newUser, [_eventTarget.name]: _eventTarget.value } });
  };

  render(){
     return(
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={this.submitSignUp}>

        <label htmlFor="name">Name: </label>
        <input 
          type="text" 
          name="name" 
          value={this.state.newUser.name} 
          onChange={(event)=>this.changeHandlerSignUp(event.target)}
        />

        <label htmlFor="lastName">Last name: </label>
        <input 
          type="text" 
          name="lastName" 
          value={this.state.newUser.lastName} 
          onChange={(event)=>this.changeHandlerSignUp(event.target)}
        />

        <label htmlFor="email">Email: </label>
        <input 
          type="text" 
          name="email" 
          value={this.state.newUser.email} 
          onChange={(event)=>this.changeHandlerSignUp(event.target)}
        />

        <label htmlFor="password">Password: </label>
        <input 
          type="password" 
          name="password" 
          value={this.state.newUser.password} 
          onChange={(event)=>this.changeHandlerSignUp(event.target)}
        />

        <button type="submit">Sign Up</button>

      </form>
    </div>
  )
  }
 
}

export default SignUp