import React from 'react'

//DEPENDENCIAS
import UserService from '../services/UserService';

class LogIn extends React.Component {

  state={
    loggingUser: { email: '', password: '' },
    errorMessageLogin: ''
  }
  
  service = new UserService();

  //LOGIN CONFIG
	submitLogIn = (event) => {
		event.preventDefault();
		this.service
			.login(this.state.loggingUser.email, this.state.loggingUser.password)
			.then((result) => {   
        this.setState({errorMessageLogin: result.message})     
        this.props.checkIfLoggedIn()
			})
			.catch((err) => {
				console.log('Sorry something went wrong on submit.', err);
			});
	};

	changeHandlerLogIn = (_eventTarget) => {
		this.setState({ loggingUser: { ...this.state.loggingUser, [_eventTarget.name]: _eventTarget.value } });
	};

  render(){
    return(
      <div>
        <h2>Log In</h2>
        <form onSubmit={this.submitLogIn}>

          <label htmlFor="email">Email: </label>
          <input 
            type="text" 
            name="email" 
            value={this.state.loggingUser.email} 
            onChange={(event)=>this.changeHandlerLogIn(event.target)}
          />

          <label htmlFor="password">Password: </label>
          <input 
            type="password" 
            name="password" 
            value={this.state.loggingUser.password} 
            onChange={(event)=>this.changeHandlerLogIn(event.target)}
          />

          <button type="submit">Log In</button>

        </form>

        <p>{this.state.errorMessageLogin}</p>
      </div>
    )

  }

}

export default LogIn