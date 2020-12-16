import React from 'react'
import DatePicker from 'react-datepicker'

//DEPENDENCIAS
import FileService from '../services/FileService';
import {Container, Col, Row, Form, Button, Card, Alert} from 'react-bootstrap'
 
import "react-datepicker/dist/react-datepicker.css";

class NewFileForm extends React.Component {

  state={
    newFile: {
      travelID: this.props.singleTravelID,
      fileName: '',
      imageUrl: '',
      category: 'Other',
      comment: '',
      date: new Date(),
      fixedDate: ''
    },
    showMessageFile: false
  }

  //Conexión Travel Service
  service = new FileService();

  //NEW FILE FORM CONFIG

  handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    this.service.handleUpload(uploadData)
      .then(response => {
          return this.setState({ newFile: { ...this.state.newFile, imageUrl: response.secure_url } });
      })
      .then(() => {
        this.disabledButton()
      })
      .catch(err => {
          console.log("Error while uploading the file: ", err);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
      this.handleShowMessageFile()
      this.service.newFile(
        this.state.newFile)
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ newFile: { ...this.state.newFile, [name]: value } })
  }

  onChangeDate = (date) =>{
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

  handleShowMessageFile = () => {
    return this.setState({showMessageFile: !this.state.showMessageFile})
  }

  disabledButton = () => {
    document.getElementById('disabled-btn').disabled = false
  }

  componentDidMount = () => {
    this.getFixedDate()
  }

  render(){

    if(!this.state.showMessageFile) {
      return(

        <div>
          <Container>
            <Row>
              <Col lg="6" className="mx-auto mt-4">
                <Card className="p-4 text-left">
  
                  <Form onSubmit={e =>this.handleSubmit(e)}>
                    <Row>
                      <Col>
  
                        <Form.Group>
                          <Form.Label htmlFor="fileName">File Name: </Form.Label>
                          <Form.Control
                          required
                          type="text" 
                          name="fileName"
                          onChange={(e)=>this.handleChange(e)}>
                          </Form.Control>
                        </Form.Group>
  
                        <Row>
                          <Col className="mr-4">
                            <Form.Group >
                              <Form.Label htmlFor="imageUrl">File: </Form.Label>
                              <Form.File
                                required
                                // custom
                                name="imageUrl"
                                onChange={(e)=>this.handleFileUpload(e)}/>
                            </Form.Group>
                          </Col>
                        </Row>
  
                        <Form.Group>
                          <Form.Label htmlFor="category">Category: </Form.Label>
                          <Form.Control
                          required
                          as="select"
                          name="category"
                          onChange={(e)=>this.handleChange(e)}>
                            <option>Other</option>
                            <option>Hotel Reservation</option>
                            <option>Transport Ticket</option>
                            <option>Experience Ticket</option>                          
                          </Form.Control>
                        </Form.Group>
  
                        <Form.Group>
                          <Form.Label htmlFor="comment">Comment: </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            type="text" 
                            name="comment" 
                            onChange={(e)=>this.handleChange(e)}>
                          </Form.Control>
                        </Form.Group>
  
                        <Form.Group>
                          <Row>
                            <Col>
                              <Form.Label>Date: </Form.Label> 
                            </Col>                                                  
                          </Row>
                          <DatePicker
                          selected={this.state.newFile.date}
                          onChange={this.onChangeDate}
                          dateFormat="dd/MM/yyyy"
                          />
                        </Form.Group>
  
                      </Col>
                    </Row>
  
                    <Row>
                      <Col className="text-center">
                        <Button id="disabled-btn" type="submit" disabled>Upload file</Button>
                      </Col>
                    </Row>
                  
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )
    
    } else {
      return (
        <div>
          <Container>
            <Row>
              <Col>
                <Alert variant="success">
                  Your file has been uploaded successfully.
                </Alert>
              </Col>
            </Row>
          </Container>
        </div>
      )
    }
  }
}

export default NewFileForm