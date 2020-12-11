import React from 'react'


class ViewFile extends React.Component {


    render() {
        return(

            <div>
                <h2>My Single File</h2>
                <div >
                    {/* <object data={this.props.imageUrl}  aria-label="fileView"></object> */}
                    <embed src={this.props.imageUrl} width="800px" height="2100px" />
                    {/* <img src={this.props.imageUrl} alt="img"></img> */}
                </div>     
            </div>
        )         
    }
}

export default ViewFile