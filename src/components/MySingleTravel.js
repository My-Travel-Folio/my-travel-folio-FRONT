import React from 'react'

import NewFileForm from './NewFileForm'

class MySingleTravel extends React.Component {

    state= {
        showNewFileForm: false,
        singleTravelID: this.props.singleTravel._id
    }

    handleNewFileForm = ()=>{
        this.setState(
            {showNewFileForm: !this.state.showNewFileForm}
        )
    }

    render() {
        return(
        <div>
            <h2>My Single Travel</h2>
            <button onClick={this.handleNewFileForm}>Add file</button>
            <p>{this.props.singleTravel.travelName}</p>
            <p>{this.props.singleTravel.startDate} - {this.props.singleTravel.endDate}</p>
            {this.state.showNewFileForm && <NewFileForm singleTravelID={this.state.singleTravelID}/>}
        </div>
        )         
    }
  
}

export default MySingleTravel