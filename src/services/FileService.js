import axios from "axios";


class FileService {

  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:3000",
      withCredentials: true
    });

    this.service = service;
  }
  
    getUser = (userID) => {
        return this.service.get(`/get-user/${userID}`, {userID})
        .then(response => response.data)
    }

    getTravel = (travelID) => {
        return this.service.get(`/get-travel/${travelID}`, {travelID})
        .then(response => response.data)
    }

    getTravelFiles = (travelID) => {
      return this.service.get(`/files/${travelID}`, {travelID})
      .then(response => response.data)
    }

    // getSearchTravelFiles = (category) => {
    //   return this.service.get(`/files-search-category`, {category})
    //   .then(response => response.data)
    // }

    getSearchTravelFiles = (hotelReservation) => {
      return this.service.get(`/files-search-hotel`, {hotelReservation})
      .then(response => response.data)
    }

    getFile = (fileID) => {
      return this.service.get(`/get-file/${fileID}`, {fileID})
      .then((response)=>{
          return response.data
      })
    }

    errorHandler = (err) => {
      // console.error(err);
      throw err;
    };

    handleUpload (theFile) {
        return this.service.post('/upload', theFile)
          .then(res => {
            console.log(res.data)
            return res.data  
          })
          .catch(this.errorHandler);
    }

    newFile (newFile) {
        return this.service.post('/new-file', newFile)
          .then(res => res.data)
          .catch(this.errorHandler);
    }

    
}

export default FileService;