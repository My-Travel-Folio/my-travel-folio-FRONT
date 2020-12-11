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
      category: '',
      comment: '',
      date: new Date()
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
          console.log('added: ', res);
      })
      .catch(err => {
          console.log("Error while adding the thing: ", err);
      });
  }

  onChangeDate = (date) =>{
    this.setState({newFile: { ...this.state.newFile, date}}) 
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
          <select name="category" onClick={(e)=>this.handleChange(e)}>
            <option value='hotelReservation'>Hotel reservation</option>
            <option value='transportTicket'>Transport ticket</option>
            <option value='experienceTicket'>Experience ticket</option>
            <option value='other'>Other</option>
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