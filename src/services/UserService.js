import axios from "axios";


class UserService {

  constructor() {
    let service = axios.create({
      // baseURL: "http://localhost:3000",
      baseURL: "https://my-travel-folio-back.herokuapp.com",
      withCredentials: true
    });


    this.service = service;
  }

  signup = (name, lastName, email, password) => {
    return this.service.post("/signup", {name, lastName, email, password})
    .then(response => response.data)
  }

  login = (email, password) => {
    return this.service.post("/login", {email, password})
    .then(response => response.data)
  }

  loggedin = () =>{
    return this.service.get("/loggedin")
    .then(response => response.data)
  }

  logout = () =>{
    return this.service.post("/logout", {})
    .then(response => response.data)
  }
}

export default UserService;