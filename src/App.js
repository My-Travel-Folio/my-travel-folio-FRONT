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
import MyProfile from './components/MyProfile';

class App extends React.Component {

  state = {
	isLogged: {},
	};

  service = new UserService();

  //Chequear usuario conectado
	checkIfLoggedIn = () => {
    this.service.loggedin()
    .then((result)=>{
      this.setState({isLogged: result})
    })
  };

	//LOGOUT CONFIG
	logOut = ()=>{
		this.service.logout()
		.then((result)=>{
			console.log(result)
			this.checkIfLoggedIn()
		})
		.catch((err)=>{
			console.log(err)
		})
	}

	componentDidMount() {
		this.checkIfLoggedIn();
	}


  render() {
    return (
      <div className="App">
	  
		<NavBar 
			isLogged={this.state.isLogged}
			checkIfLoggedIn={this.checkIfLoggedIn}
			logOut={this.logOut}
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
			<LogIn
			isLogged={this.state.isLogged}
			checkIfLoggedIn={this.checkIfLoggedIn}
			/>
			)}
		/>

        <Route 
			exact path="/" 
			render={()=>
			<Home
			isLogged={this.state.isLogged}
			/>} 
		/>

		{}
        <Route
			path="/my-profile"
			render={() => (
			<MyProfile/>
			)}
		/>

      </div>
    );
  }

}

export default App;
