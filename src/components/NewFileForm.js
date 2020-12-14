import React from 'react'
import DatePicker from 'react-datepicker'

//DEPENDENCIAS
import FileService from '../services/FileService';

// import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

class NewFileForm extends React.Component {

  state={
    newFile: {
      travelID: this.props.singleTravelID,
      fileName: '',
      imageUrl: '',
      category: 'other',
      comment: '',
      date: new Date(),
      fixedDate: ''
    }
  }

  //Conexión Travel Service
  service = new FileService();

  //NEW TRAVEL FORM CONFIG

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ newFile: { ...this.state.newFile, [name]: value } })
  }

  handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    this.service.handleUpload(uploadData)
      .then(response => {
          return this.setState({ newFile: { ...this.state.newFile, imageUrl: response.secure_url } });
      })
      .catch(err => {
          console.log("Error while uploading the file: ", err);
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    
    this.service.newFile(this.state.newFile)
      .then(res => {
        // this.changeDate()
          console.log('added: ', res);
      })
      .catch(err => {
          console.log("Error while adding the thing: ", err);
      });
  }

  // changeDate = () => {
  //   const newDate = {...this.state.newFile.date}.toString()
  //   const year = newDate.slice(0,4)
  //   const month = newDate.slice(5,7)
  //   const day = newDate.slice(8, 10)

  //   const newDateFixed = `${day}/${month}/${year}`

  //   this.setState({newFile: { ...this.state.newFile, date: newDateFixed}})
  // }

  onChangeDate = (date) =>{
    // const newDate = date.toString()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const newDateFixed = `${day}/${month}/${year}`
    
    this.setState({newFile: { ...this.state.newFile, fixedDate: newDateFixed, date}})
  }

  getFixedDate = () => {
    const date = this.state.newFile.date
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const newDateFixed = `${day}/${month}/${year}`
    return this.setState({newFile: { ...this.state.newFile, fixedDate: newDateFixed}})
  }

  componentDidMount () {
    this.getFixedDate()
  }


  render(){
    return(
      <div>
        <h2>Soy el formulario para subir un file</h2>
        
        <form onSubmit={e =>this.handleSubmit(e)}>

          <label htmlFor="fileName">File Name: </label>
          <input
            type="text" 
            name="fileName"
            onChange={(e)=>this.handleChange(e)}
          />

          <label htmlFor="imageUrl">File: </label>
          <input 
            type="file" 
            name="imageUrl"
            onChange={(e)=>this.handleFileUpload(e)}
          />

          <label htmlFor="category">Category: </label>
          <select name="category" onChange={(e)=>this.handleChange(e)}>
            <option>Other</option>
            <option>Hotel Reservation</option>
            <option>Transport ticket</option>
            <option>Experience ticket</option>
          </select>

          <label htmlFor="comment">Comment: </label>
          <input 
            type="text" 
            name="comment" 
            onChange={(e)=>this.handleChange(e)}
          />

          <DatePicker
            selected={this.state.newFile.date}
            onChange={this.onChangeDate}
            dateFormat="dd/MM/yyyy"
           />

          <button type="submit">Upload file</button>

        </form>

      </div>
    )
  }
}

export default NewFileForm