import React from 'react'
import ViewFile from './ViewFile'

class SingleFile extends React.Component {

    state= {
        imageUrl: this.props.singleFile.imageUrl,
        showViewFile: false
    }

    handleViewFile = ()=>{
        this.setState(
            {showViewFile: !this.state.showViewFile}
        )
    }

    

    render() {
        return(

            <div>
                <h2>My Single File</h2>
                <div >
                    <p>Day: {this.props.singleFile.date}</p>
                    <p>Name: {this.props.singleFile.fileName}</p>
                    <p>Comment: {this.props.singleFile.comment}</p>
                    <button onClick={this.handleViewFile}>View File</button>
                    <button>Download File</button>
                    {this.state.showViewFile && <ViewFile imageUrl={this.state.imageUrl}/>}
                </div>     
            </div>

        )         
    }
  
}

export default SingleFile