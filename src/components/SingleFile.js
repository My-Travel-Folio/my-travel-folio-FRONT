import React from 'react'


class SingleFile extends React.Component {

    state= {

    }


    render() {
        return(

            <div>
                <h2>My Single File</h2>
                <div >
                    <p>Day: {this.props.singleFile.date}</p>
                    <p>Name: {this.props.singleFile.fileName}</p>
                    <p>Comment: {this.props.singleFile.comment}</p>
                    <button>View File</button>
                    <button>Download File</button>
                </div>     
            </div>

        )         
    }
  
}

export default SingleFile