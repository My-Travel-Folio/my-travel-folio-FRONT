import axios from "axios";


class FileService {

  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:3000",
      withCredentials: true
    });

    this.service = service;
    }

    newFile= (travelID, fileName, imageUrl, category, comment, date) => {
    return this.service.post(`/new-travel/${travelID}`, {travelID, fileName, imageUrl, category, comment, date})
    .then(response => response.data)
    }

    getUser = (userID) => {
        return this.service.get(`/get-user/${userID}`, {userID})
        .then(response => response.data)
    }

    getTravel = (travelID) => {
        return this.service.get(`/get-travel/${travelID}`, {travelID})
        .then(response => response.data)
    }

}

export default FileService;