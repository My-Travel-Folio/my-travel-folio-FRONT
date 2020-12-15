import React from 'react'

class ViewFile extends React.Component {


    render() {
        return(

            <div>
                <div >
                    <object data={this.props.imageUrl}  aria-label="fileView"></object>
                    {/* <embed src={this.props.imageUrl} width="50%" height="auto" /> */}
                    {/* <img src={this.props.imageUrl} alt="img"></img> */}
                </div>     
            </div>
        )         
    }
}

export default ViewFile