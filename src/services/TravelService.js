import axios from "axios";


class TravelService {

  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:3000",
      // baseURL: "https://my-travel-folio-back.herokuapp.com",
      withCredentials: true
    });

  this.service = service;
  }

  newTravel = (userID, travelName, startDate, endDate, startDateFixed, endDateFixed) => {
  return this.service.post(`/new-travel/${userID}`, {userID, travelName, startDate, endDate, startDateFixed, endDateFixed})
  .then(response => response.data)
  }

  getUser = (userID) => {
      return this.service.get(`/get-user/${userID}`, {userID})
      .then(response => response.data)
  }

  getAllTravels = (userID) => {
      return this.service.get(`/all-travels/${userID}`, {userID})
      .then((response)=>{
          return response.data
      })
  }

  getTravel = (travelID) => {
    return this.service.get(`/get-travel/${travelID}`, {travelID})
    .then((response)=>{
        return response.data
    })
  }

  //POST: delete travel

  deleteTravel = (travelID) => {
    return this.service.post(`/delete-travel/${travelID}`, {travelID})
    .then((response)=>{
      return response.data
    })
  }

}


export default TravelService;