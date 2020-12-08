import React from 'react'

const Home = (props)=>{
  return(
    <div>
      <h2>Home</h2>
      <h3>{props.isLogged.email && `Welcome, ${props.isLogged.name}`}</h3>
      {props.isLogged.email && <button onClick={()=>props.logOut()}>Log Out</button>}
    </div>
  )
}

export default Home