import React from 'react'

import FileService from '../services/FileService';
import {Container, Row, Col, Card, Button, Alert, Modal, ButtonGroup} from 'react-bootstrap'
import {Image, Transformation, CloudinaryContext} from 'cloudinary-react'

class SingleFile extends React.Component {

  state= {
    deleteMessage: false,
    show: false,
    downloadUrl: '',
    publicId: ''
  }

  //Conexión Travel & File Service
  fileService = new FileService();

  // DELETE TRAVEL

  deleteFile = (fileID) =>{
    this.fileService.deleteFile(fileID)
    .then(()=>{
      this.setState({deleteMessage: true})
      console.log("File removed")
    })
  }

  setShow = ()=>{
    this.handleDownload()
    this.setState({show: !this.state.show})
  }

  handleDownload = () => {
    const URL = this.props.singleFile.imageUrl
    const publicId = URL.slice(68,URL.length-4)
    const firstPart = URL.slice(0, 56)
    const endPart = URL.slice(55,URL.length)
    
    const downloadLink = `${firstPart}fl_attachment${endPart}`

    this.setState({downloadUrl: downloadLink, publicId})
  }

  handleDeleteFile = (fileID)=>{
    console.log(fileID)
    this.deleteFile(fileID)
  }



    render() {

        if(!this.state.show && !this.state.deleteMessage) {
            return(
                <div>
                    <Container>
                        <Row>
                            <Col lg="6" className="mt-4 mx-auto">
                                <Card >
                                <Card.Body>
                                    <Card.Title>{this.props.singleFile.fileName}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{this.props.singleFile.fixedDate}</Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">{this.props.singleFile.category}</Card.Subtitle>
                                    <Card.Subtitle className="mb-4 mt-4 text-muted">{this.props.singleFile.comment}</Card.Subtitle>
                                        <ButtonGroup>
                                          <Button variant="outline-primary" className="mr-4 mx-auto" size="sm" onClick={this.setShow}>Preview</Button>
                                          <Button variant="outline-danger" className="ml-4 mx-auto" size="sm" onClick={()=>this.handleDeleteFile(this.props.singleFile._id)}>Delete File</Button>
                                        </ButtonGroup>
                                </Card.Body>
                                </Card>
                            </Col>
                        </Row>
 
                    </Container>

                </div>
            )
        } else if (this.state.show && !this.state.deleteMessage){
            return(
                <div>
                    <Container>
                        <Button onClick={this.handleViewFile}>Back to {this.props.singleFile.fileName}</Button>

                        <Modal
                            size="lg"
                            centered
                            show={this.state.show}
                            onHide={this.setShow}
                            dialogClassName="modal-100w"
                            aria-labelledby="example-custom-modal-styling-title"
                        >
                          <Modal.Header closeButton>
                              <Modal.Title id="example-custom-modal-styling-title">
                                {this.props.singleFile.fileName}
                              </Modal.Title>


                          </Modal.Header>
                          <Modal.Body className="w-100 mx-auto">
                            <Row>
                              <Col className="mx-auto">
                                <Button href={this.state.downloadUrl} variant="outline-info" size="sm">Download</Button>
                              </Col>                           
                            </Row>

                            <Row>
                              <CloudinaryContext cloudName="my-travel-folio">
                                <Image className="modal-content" publicId={`${this.state.publicId}.jpeg`} >
                                  <Transformation  flags="attachment:descarga" />
                                </Image>
                              </CloudinaryContext>
                            </Row>
                              
                          </Modal.Body>
                        </Modal>
                    </Container>

                </div>
            )
        } else if (this.state.deleteMessage && !this.state.show){
            return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Alert className="mt-4" variant="danger">
                            Your file has been removed successfully.
                            </Alert>
                        </Col>
                    </Row>
                </Container>
            </div>
            )

        }
    }
}

export default SingleFile