import React from 'react'


//DEPENDENCIAS
import { Link } from 'react-router-dom';
import UserService from '../services/UserService';


class NavBar extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      isLogged: {},
    }
    this.service = new UserService();
  }

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

  render(){
    return(
        <div>

        <Link to="/">Home Page</Link>
        <br/>
        <Link to="/signup">Sign Up</Link>
        <br/>
        <Link to="/login">Log In </Link>

        </div>
      )

  }
  
}

export default NavBar