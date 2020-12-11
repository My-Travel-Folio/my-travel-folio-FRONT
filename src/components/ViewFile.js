import React from 'react'


class ViewFile extends React.Component {


    render() {
        return(

            <div>
                <h2>My Single File</h2>
                <div >
                    <object data={this.props.imageUrl}  width="550px" height="150px" aria-label="fileView"></object>
                </div>     
            </div>
        )         
    }
}

export default ViewFile