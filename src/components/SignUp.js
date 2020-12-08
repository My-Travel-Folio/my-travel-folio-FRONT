import React from 'react'

const SignUp = (props)=>{
  // const {submitSignUp, newUser, changeHandlerSignUp} = props
  return(
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={props.submitSignUp}>

        <label htmlFor="name">Name: </label>
        <input 
          type="text" 
          name="name" 
          value={props.newUser.name} 
          onChange={(event)=>props.changeHandlerSignUp(event.target)}
        />

        <label htmlFor="lastName">Last name: </label>
        <input 
          type="text" 
          name="lastName" 
          value={props.newUser.lastName} 
          onChange={(event)=>props.changeHandlerSignUp(event.target)}
        />

        <label htmlFor="email">Email: </label>
        <input 
          type="text" 
          name="email" 
          value={props.newUser.email} 
          onChange={(event)=>props.changeHandlerSignUp(event.target)}
        />

        <label htmlFor="password">Password: </label>
        <input 
          type="password" 
          name="password" 
          value={props.newUser.password} 
          onChange={(event)=>props.changeHandlerSignUp(event.target)}
        />

        <button type="submit">Sign Up</button>

      </form>
    </div>
  )
}

export default SignUp