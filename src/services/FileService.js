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