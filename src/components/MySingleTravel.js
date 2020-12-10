import React from 'react'

//DEPENDENCIAS
import TravelService from '../services/TravelService';


class MySingleTravel extends React.Component {

    state={
        singleTravel: ''
    }

  //Conexión Travel Service
  service = new TravelService();

  render() {
    return(
      <div>
          <h2>My Single Travel</h2>
      </div>
    )    
  }
}

export default MySingleTravel