import React from 'react'

import ViewFile from './ViewFile'

import FileService from '../services/FileService';

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
                    <h2>My Single File</h2>
                    <div>
                        <p>Day: {this.props.singleFile.fixedDate}</p>
                        <p>Name: {this.props.singleFile.fileName}</p>
                        {this.props.singleFile.comment && <p>Comment: {this.props.singleFile.comment}</p>}
                        <p>Category: {this.props.singleFile.category}</p>
                        <button onClick={this.handleViewFile}>View File</button>
                        <button onClick={()=>this.handleDeleteFile(this.props.singleFile._id)}>Delete File</button>
                        {/* <a href={this.props.singleFile.imageUrl} target="_blank" rel="noopener noreferrer" download>Download</a> */}
                        {/* <a href={this.props.singleFile.imageUrl} download={`${this.props.singleFile.fileName}.pdf`}><button>Download File</button></a> */}
                    </div>     
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