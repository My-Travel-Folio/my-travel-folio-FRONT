import React from 'react';
import './App.css';

//COMPONENTES
import NavBar from './components/NavBar';
import Home from './components/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

//DEPENDENCIAS
import { Route, Redirect } from 'react-router-dom';
import UserService from './services/UserService';
import MyProfile from './components/MyProfile';

class App extends React.Component {

  state = {
	isLogged: {},
	};

//Conexión User Service
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
				!this.state.isLogged.email
				? <SignUp 
					checkIfLoggedIn={this.checkIfLoggedIn}
				/>
				: <Redirect to='/' />
			)}
		/>

        <Route
			path="/login"
			render={() => (
				!this.state.isLogged.email
				? <LogIn
					checkIfLoggedIn={this.checkIfLoggedIn}
				/>
				: <Redirect to='/' />
			)}
		/>

        <Route 
			exact path="/" 
			render={()=>
			!this.state.isLogged.email
			? <Home
				isLogged={this.state.isLogged}
			/>
			: <MyProfile
				isLogged={this.state.isLogged}
				checkIfLoggedIn={this.checkIfLoggedIn}
			/>
			} 
		/>

		<Route
			path="/my-profile"
			render={() => (
			this.state.isLogged.email
			? <MyProfile
				isLogged={this.state.isLogged}
			/>
			: <Redirect to='/login' />
			)}
		/>

      </div>
    );
  }

}

export default App;
