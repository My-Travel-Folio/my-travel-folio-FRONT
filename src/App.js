import React from 'react';
import './App.css';

//COMPONENTES
import NavBar from './components/NavBar';
import Home from './components/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

//DEPENDENCIAS
import { Route } from 'react-router-dom';
import UserService from './services/UserService';

class App extends React.Component {

  state = {
	isLogged: {}, //¿Cómo pasar esto por props? //Cómo afectan los estilos?
	};

  service = new UserService();
  
	checkIfLoggedIn = () => {
    this.service.loggedin()
    .then((result)=>{
      this.setState({isLogged: result})
    })
  };

	componentDidMount() {
		this.checkIfLoggedIn();
	}

  render() {
    return (
      <div className="App">
	  
		<NavBar 
			checkIfLoggedIn={this.checkIfLoggedIn}
		/>

		<Route
			path="/signup"
			render={() => (
			<SignUp />
			)}
		/>

        <Route
			path="/login"
			render={() => (
			<LogIn/>
			)}
		/>

        <Route 
			exact path="/" 
			render={()=><Home 
			logOut={this.logOut} 
			isLogged={this.state.isLogged} />} 
		/>

      </div>
    );
  }

}

export default App;
