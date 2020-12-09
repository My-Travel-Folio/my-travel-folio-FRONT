import React from 'react'

//DEPENDENCIAS
import { Link } from 'react-router-dom';

const NavBar = (props)=>{


    return(
        <div>

          {!props.isLogged.email && <Link to="/signup">Sign Up</Link>}
          <br/>
          {!props.isLogged.email && <Link to="/login">Log In</Link>}
          <br/>
          {props.isLogged.email && <Link to="/my-profile">My Profile</Link>}
          <br/>
          {props.isLogged.email && <button onClick={()=>props.logOut()}>Log Out</button>}

        </div>
      )
  
}

export default NavBar