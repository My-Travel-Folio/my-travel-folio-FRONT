import React from 'react'
import NewFileForm from './NewFileForm'
import SingleFile from './SingleFile'

import FileService from '../services/FileService';


class MySingleTravel extends React.Component {

    state= {
        showSingleFile: false,
        showNewFileForm: false, 
        singleFile: '',
        mySingleTravelFiles: this.props.mySingleTravelFiles,
        filteredFiles: this.props.mySingleTravelFiles
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

    // GET SINGLE TRAVEL FILES
    getFilesData = (travelID)=>{
        this.service.getTravelFiles(travelID)
        .then((response)=>{
            this.setState({mySingleTravelFiles: response})
        })
      }

    //          HANDLE FUNCTIONS

    //HOTEL FILTER
    handleSearchTravelFilesHotel = () => {
        const hotelReservation = this.state.mySingleTravelFiles.filter((file) => (
            file.category === 'Hotel Reservation'
        ))
        this.setState({filteredFiles: hotelReservation})
    }

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

    handleBackToTravel = async (travelID)=> {
        await this.getFilesData(travelID)
        this.setState({showNewFileForm: !this.state.showNewFileForm})
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
                        <button onClick={this.handleSearchTravelFilesHotel}>Hotel</button>
                        <button onClick={this.handleNewFileForm}>Add file</button>
                            <p>{this.props.singleTravel.travelName}</p>
                            <p>{this.props.singleTravel.startDate} - {this.props.singleTravel.endDate}</p>

                        {this.state.filteredFiles.map((singleFile, index)=>(
                            <div key={index}>
                                <button onClick={()=>this.handleSingleFile(singleFile._id)}>
                                    <p>Day: {singleFile.fixedDate}</p>
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
                    <button onClick={()=>this.handleBackToTravel(this.props.singleTravel._id)}>Back to {this.props.singleTravel.travelName}</button>
                </div>
            )
        }      
    }
}

export default MySingleTravel