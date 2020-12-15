import React from 'react'
import NewFileForm from './NewFileForm'
import SingleFile from './SingleFile'

//DEPENDENCIAS
import FileService from '../services/FileService';
import TravelService from '../services/TravelService'


class MySingleTravel extends React.Component {

    state= {
        showSingleFile: false,
        showNewFileForm: false, 
        singleFile: '',
        mySingleTravelFiles: this.props.mySingleTravelFiles,
        filteredFiles: this.props.mySingleTravelFiles,
        deleteMessage: false
    }

    //Conexión Travel & File Service
    travelService = new TravelService();
    fileService = new FileService();

    //          GET DATA FROM DB
            
    // SINGLE FILE INFO
    getSingleFile = (_id)=>{
        this.fileService.getFile(_id)
        .then((response)=>{
            this.setState({singleFile: response})
        })
    }

    // GET SINGLE TRAVEL FILES
    getFilesData = (travelID)=>{
        this.fileService.getTravelFiles(travelID)
        .then((response)=>{
            this.setState({mySingleTravelFiles: response, filteredFiles: response})
            
        })
      }

    // DELETE TRAVEL

    deleteTravel = (travelID) =>{
        this.travelService.deleteTravel(travelID)
        .then(()=>{
            this.setState({deleteMessage: true})
            console.log("Travel removed")
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

    //EXPERIENCE FILTER
    handleSearchTravelFilesExperience = () => {
        const experience = this.state.mySingleTravelFiles.filter((file) => (
            file.category === 'Experience Ticket'
        ))
        this.setState({filteredFiles: experience})
    }

    //TRANSPORT FILTER
    handleSearchTravelFilesTransport = () => {
        const transport = this.state.mySingleTravelFiles.filter((file) => (
            file.category === 'Transport Ticket'
        ))
        this.setState({filteredFiles: transport})
    }

    //OTHER FILTER
    handleSearchTravelFilesOther = () => {
        const other = this.state.mySingleTravelFiles.filter((file) => (
            file.category === 'Other'
        ))
        this.setState({filteredFiles: other})
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

    handleDeleteTravel = (travelID)=>{
        console.log(travelID)
        this.deleteTravel(travelID)
    }

    // LIFECYCLE METHODS

    componentDidMount() {
        this.getSingleFile(this.state.singleFile._id)
    }

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
            } else if (!this.state.showSingleFile && !this.state.deleteMessage){
                return (
                    <div>
                        <button onClick={this.handleSearchTravelFilesHotel}>Hotel Reservation</button>
                        <button onClick={this.handleSearchTravelFilesExperience}>Experience Ticket</button>
                        <button onClick={this.handleSearchTravelFilesTransport}>Transport Ticket</button>
                        <button onClick={this.handleSearchTravelFilesOther}>Other</button>
                        <button onClick={this.handleNewFileForm}>Add file</button>
                        <button onClick={()=>this.handleDeleteTravel(this.props.singleTravel._id)}>Delete Travel</button>
                            <p>{this.props.singleTravel.travelName}</p>
                            <p>{this.props.singleTravel.startDateFixed} - {this.props.singleTravel.endDateFixed}</p>

                        {this.state.filteredFiles.sort((a, b)=> new Date(a.date) - new Date(b.date)).map((singleFile, index)=>(
                            <div key={index}>
                                <button onClick={()=>this.handleSingleFile(singleFile._id)}>
                                    <p>Day: {singleFile.fixedDate}</p>
                                    <p>{singleFile.fileName}</p>
                                </button>
                            </div>     
                        ))}
                    </div>
                )
            } else if (this.state.deleteMessage && !this.state.showSingleFile){
                return(
                    <div>
                        <p>Your travel has beem removed succesfully</p>
                    </div>
                )
            } 
        } else if(this.state.showNewFileForm) {
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