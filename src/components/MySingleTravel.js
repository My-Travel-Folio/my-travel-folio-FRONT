import React from 'react'
import NewFileForm from './NewFileForm'
import SingleFile from './SingleFile'

import FileService from '../services/FileService';


class MySingleTravel extends React.Component {

    state= {
        singleTravelID: this.props.singleTravel._id,
        showSingleFile: false,
        showNewFileForm: false, 
        singleFile: '',
        singleFileID: '',
    }

    service = new FileService();

    getSingleFile = ()=>{
        this.service.getFile(this.state.singleFileID)
        .then((response)=>{
            this.setState({singleFile: response})
        })
      }

    handleNewFileForm = ()=>{
        this.setState(
            {showNewFileForm: !this.state.showNewFileForm}
        )
    }
    
    handleSingleFile = (fileID)=>{
        this.setState(
            {singleFileID: fileID}
        ) 
        
        this.setState( {showSingleFile: !this.state.showSingleFile})
       
        setTimeout (() => {
          this.getSingleFile()
        }, 100)
      }

    render() {
        return(
        <div>
            <h2>My Single Travel</h2>
            <button onClick={this.handleNewFileForm}>Add file</button>
            <p>{this.props.singleTravel.travelName}</p>
            <p>{this.props.singleTravel.startDate} - {this.props.singleTravel.endDate}</p>

            {this.state.showNewFileForm && <NewFileForm singleTravelID={this.state.singleTravelID}/>}

                {this.props.mySingleTravelFiles.map((singleFile, index)=>(
                <div key={index}>

                    <button onClick={()=>this.handleSingleFile(singleFile._id)}>
                        <p>Day: {singleFile.date}</p>
                        <p>{singleFile.fileName}</p>
                    </button>

                </div>     
                ))}

                {this.state.showSingleFile && <SingleFile singleFile={this.state.singleFile}/>}

        </div>
        )         
    }
  
}

export default MySingleTravel