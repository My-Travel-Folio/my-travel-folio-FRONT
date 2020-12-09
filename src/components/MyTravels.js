import React from 'react'


const MyTravels = (props)=>{

  return(
    <div>
        <h2>My Travels</h2>
        {props.allTravels.map((travel, index)=>{
          return <div key={index}>
                    <p >{travel.travelName}</p>
                    <p >{travel.startDate}</p>
                </div>
        })}
    </div>
  )
}

export default MyTravels