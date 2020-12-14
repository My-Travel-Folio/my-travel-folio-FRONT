import React from 'react'

import ViewFile from './ViewFile'

class SingleFile extends React.Component {

    state= {
        showViewFile: false
    }

    handleViewFile = ()=>{
        this.setState(
            {showViewFile: !this.state.showViewFile}
        )
    }

    download(imageUrl) {
        window.open(imageUrl);
    }

    render() {

        if(!this.state.showViewFile) {
            return(
                <div>
                    <h2>My Single File</h2>
                    <div>
                        <p>Day: {this.props.singleFile.date}</p>
                        <p>Name: {this.props.singleFile.fileName}</p>
                        {this.props.singleFile.comment && <p>Comment: {this.props.singleFile.comment}</p>}
                        <p>Category: {this.props.singleFile.category}</p>
                        <button onClick={this.handleViewFile}>View File</button>
                        {/* <a href={this.props.singleFile.imageUrl} target="_blank" rel="noopener noreferrer" download>Download</a> */}
                        {/* <a href={this.props.singleFile.imageUrl} download={`${this.props.singleFile.fileName}.pdf`}><button>Download File</button></a> */}
                    </div>     
                </div>
            )
        } else {
            return(
                <div>
                    <h2>My Single File</h2>
                    <button onClick={this.handleViewFile}>Back to {this.props.singleFile.fileName}</button>
                    <ViewFile imageUrl={this.props.singleFile.imageUrl}/>
                </div>
            )
        }      
    }
}

export default SingleFile