import React from 'react'

//DEPENDENCIAS
import FileService from '../services/FileService';


class NewFileForm extends React.Component {

  state={
    newFile: {
        travelID: this.props.singleTravelID,
        fileName: '',
        imageUrl: '',
        category: '',
        comment: '',
        date: '' }
  }

  //Conexión Travel Service
  service = new FileService();

  //NEW TRAVEL FORM CONFIG

  submitNewFile = (event) => {
    event.preventDefault();
      this.service.newFile(
          this.state.newFile.travelID,
          this.state.newFile.fileName,
          this.state.newFile.imageUrl,
          this.state.newFile.category,
          this.state.newFile.comment,
          this.state.newFile.date)
      .then(() => {
        this.props.checkIfLoggedIn();
      })
      .catch((err) => {
        console.log(err);
      });
  }


  changeHandlerNewFile = (_eventTarget) => {
		this.setState({ newFile: { ...this.state.newFile, [_eventTarget.name]: _eventTarget.value } });
  };

  render(){
      return(
    <div>
      
      <h2>Soy el formulario para subir un file</h2>

      <form onSubmit={this.submitNewFile}>

        <label htmlFor="fileName">File Name: </label>
        <input
          type="text" 
          name="fileName" 
          value={this.state.newFile.fileName} 
          onChange={(event)=>this.changeHandlerNewFile(event.target)}
        />

        <label htmlFor="imageUrl">File: </label>
        <input 
          type="file" 
          name="imageUrl" 
          value={this.state.newFile.imageUrl} 
          onChange={(event)=>this.changeHandlerNewFile(event.target)}
        />

        <label htmlFor="category">Category: </label>
        <select name="category" value={this.state.newFile.category} onClick={(event)=>this.changeHandlerNewFile(event.target)}>
          <option value='hotelReservation'>Hotel reservation</option>
          <option value='transportTicket'>Transport ticket</option>
          <option value='experienceTicket'>Experience ticket</option>
          <option value='other'>Other</option>
        </select>

        <label htmlFor="comment">Comment: </label>
        <input 
          type="text" 
          name="comment" 
          value={this.state.newFile.comment} 
          onChange={(event)=>this.changeHandlerNewFile(event.target)}
        />

        <label htmlFor="date">Date: </label>
        <input 
          type="text" 
          name="date" 
          value={this.state.newFile.date} 
          onChange={(event)=>this.changeHandlerNewFile(event.target)}
        />

        <button type="submit">Upload file</button>

      </form>

    </div>
  )
  }
}

export default NewFileForm