import axios from "axios";


class TravelService {

  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:3000",
      withCredentials: true
    });

  this.service = service;
  }

  newTravel = (userID, travelName, startDate, finishDate) => {
  return this.service.post(`/new-travel/${userID}`, {userID, travelName, startDate, finishDate})
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
}

export default TravelService;