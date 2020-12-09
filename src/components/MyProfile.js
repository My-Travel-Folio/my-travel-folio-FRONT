import React from 'react'

class MyProfile extends React.Component {

    render(){
        return(
            <div>
                <h2>My Profile</h2>
                <h3>{this.props.isLogged.email && `Welcome, ${this.props.isLogged.name}`}</h3>
            </div>
        )
    }
}

export default MyProfile