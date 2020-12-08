import React from 'react';
import './App.css';

//COMPONENTES
import Home from './components/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

//DEPENDENCIAS
import { Link, Route, Redirect } from 'react-router-dom';
import UserService from './services/UserService';

class App extends React.Component {

  state = {
		isLogged: {},
		newUser: { name: '', lastName: '', email:'', password: '' },
    loggingUser: { email: '', password: '' },
	};

  service = new UserService();
  
  //SIGNUP CONFIG
	submitSignUp = (event) => {
		event.preventDefault();
    this.service.signup(this.state.newUser.name, this.state.newUser.lastName, this.state.newUser.email, this.state.newUser.password)
			.then((result) => {
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	changeHandlerSignUp = (_eventTarget) => {
		this.setState({ newUser: { ...this.state.newUser, [_eventTarget.name]: _eventTarget.value } });
  };
  
  //LOGIN CONFIG
	submitLogIn = (event) => {
		event.preventDefault();
		this.service
			.login(this.state.loggingUser.email, this.state.loggingUser.password)
			.then(() => {
				this.checkIfLoggedIn()
			})
			.catch((err) => {
				console.log('Sorry something went wrong on submit.', err);
			});
	};

	changeHandlerLogIn = (_eventTarget) => {
		this.setState({ loggingUser: { ...this.state.loggingUser, [_eventTarget.name]: _eventTarget.value } });
	};

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
        <h1>Hola</h1>
        <Link to="/">Home Page</Link>
				<br />
        {!this.state.isLogged.email && <Link to="/signup">Sign Up</Link>}
        <br />
        {!this.state.isLogged.email && <Link to="/login">Log In</Link>}

        <Route
					path="/signup"
					render={() => (
						!this.state.isLogged.email
							? <SignUp submitSignUp={this.submitSignUp} newUser={this.state.newUser} changeHandlerSignUp={this.changeHandlerSignUp}/>
							: <Redirect to='/' />
					)}
				/>

        <Route
					path="/login"
					render={() => (
						<LogIn
							submitLogIn={this.submitLogIn}
							loggingUser={this.state.loggingUser}
							changeHandlerLogIn={this.changeHandlerLogIn}
						/>
					)}
				/>

        <Route exact path="/" render={()=><Home logOut={this.logOut} isLogged={this.state.isLogged} />} />

      </div>
    );
  }

}

export default App;
