import React from 'react'

import ViewFile from './ViewFile'

import FileService from '../services/FileService';
import {Container, Row, Col, Card, Button} from 'react-bootstrap'

class SingleFile extends React.Component {

    state= {
        showViewFile: false,
        deleteMessage: false
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

    handleViewFile = ()=>{
        this.setState(
            {showViewFile: !this.state.showViewFile}
        )
    }

    handleDeleteFile = (fileID)=>{
        console.log(fileID)
        this.deleteFile(fileID)
    }

    download(imageUrl) {
        window.open(imageUrl);
    }

    render() {

        if(!this.state.showViewFile && !this.state.deleteMessage) {
            return(
                <div>
                    <Container>
                        <Row>
                            <Col>
                            <Card style={{ width: '18rem' }} className="mx-auto">
                                <Card.Body>
                                    <Card.Title>{this.props.singleFile.fileName}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{this.props.singleFile.fixedDate}</Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">{this.props.singleFile.category}</Card.Subtitle>
                                        <Button className="mr-1" size="sm" onClick={this.handleViewFile}>View File</Button>
                                        <Button variant="danger" className="ml-1"size="sm" onClick={()=>this.handleDeleteFile(this.props.singleFile._id)}>Delete File</Button>
                                </Card.Body>
                                </Card>
                            </Col>
                        </Row>
 
                    </Container>
                    
                    {/* <div>
                        <p>Day: {this.props.singleFile.fixedDate}</p>
                        
                        {this.props.singleFile.comment && <p>Comment: {this.props.singleFile.comment}</p>}
                        <p>Category: {this.props.singleFile.category}</p>
                        <button onClick={this.handleViewFile}>View File</button>
                        <button onClick={()=>this.handleDeleteFile(this.props.singleFile._id)}>Delete File</button>

                    </div>      */}
                </div>
            )
        } else if (this.state.showViewFile && !this.state.deleteMessage){
            return(
                <div>
                    <h2>My Single File</h2>
                    <button onClick={this.handleViewFile}>Back to {this.props.singleFile.fileName}</button>
                    <ViewFile imageUrl={this.props.singleFile.imageUrl}/>
                </div>
            )
        } else if (this.state.deleteMessage && !this.state.showViewFile){
            return(
            <div>
                <p>Your file has been removed successfully</p>
            </div>
            )

        }
    }
}

export default SingleFile