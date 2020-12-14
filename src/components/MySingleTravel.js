import React from 'react'
import NewFileForm from './NewFileForm'
import SingleFile from './SingleFile'

import FileService from '../services/FileService';


class MySingleTravel extends React.Component {

    state= {
        showSingleFile: false,
        showNewFileForm: false, 
        singleFile: '',
        mySingleTravelFiles: this.props.mySingleTravelFiles
    }

    service = new FileService();

    //          GET DATA FROM DB
            
    // SINGLE FILE INFO
    getSingleFile = (_id)=>{
        this.service.getFile(_id)
        .then((response)=>{
            this.setState({singleFile: response})
        })
    }

    // FILTER FILES BY CATEGORY
    getSearchTravelFiles = ()=>{
        this.service.getSearchTravelFiles()
        .then((response)=>{
            this.setState({mySingleTravelFiles: response})
        })
    }

    //          HANDLE FUNCTIONS

    //HOTEL FILTER
    // handleSearchTravelFilesHotel = () => {
    //     // const hotelReservation = 'hotelReservation'
    //     console.log('Hola')
    //     this.getSearchTravelFiles()
    // }

    //SHOW FILE FORM
    handleNewFileForm = ()=>{
        this.setState(
            {showNewFileForm: !this.state.showNewFileForm}
        )
    }
    
    // SHOW SINGLE FILE
    handleSingleFile = async (fileID)=>{
        await this.getSingleFile(fileID)
        this.setState( {showSingleFile: !this.state.showSingleFile})
    }


    // sortByDate () {
    //     let newTravelFiles = [...this.state.mySingleTravelFiles].sort((a, b) => a.date > b.date)
    //     this.setState({
    //         mySingleTravelFiles: newTravelFiles
    //     })
    // }

    // LIFECYCLE METHODS

    componentDidMount() {
        this.getSingleFile(this.state.singleFile._id)
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.mySingleTravelFiles !== prevProps.mySingleTravelFiles) {
    //         this.props.getFilesData(this.props.singleTravel._id)
    //     }
    // }

    render() {
                        // ESTO CÓMO PUEDE SER QUE ESTÉ FUNCIONANDO AL REVÉS???

        if(!this.state.showNewFileForm) {        
            if(this.state.showSingleFile) {
                return (
                    <div>
                        <button onClick={this.handleSingleFile}>Back to {this.props.singleTravel.travelName}</button>
                        <SingleFile singleFile={this.state.singleFile} singleTravelID={this.props.singleTravel._id} />
                    </div>
                )
            } else {
                return (
                    <div>
                        {/* <button onClick={this.handleSearchTravelFilesHotel}>Hotel</button> */}
                        <button onClick={this.handleNewFileForm}>Add file</button>
                            <p>{this.props.singleTravel.travelName}</p>
                            <p>{this.props.singleTravel.startDate} - {this.props.singleTravel.endDate}</p>

                        {this.props.mySingleTravelFiles.map((singleFile, index)=>(
                            <div key={index}>
                                <button onClick={()=>this.handleSingleFile(singleFile._id)}>
                                    <p>Day: {singleFile.date}</p>
                                    <p>{singleFile.fileName}</p>
                                </button>
                            </div>     
                        ))}
                    </div>
                )
            }
        } else {
            return(
                <div>
                    <NewFileForm singleTravelID={this.props.singleTravel._id}/>
                    <button onClick={this.handleNewFileForm}>Back to {this.props.singleTravel.travelName}</button>
                </div>
            )
        }      
    }
}

export default MySingleTravel