import React, { Component } from 'react'

class Delete extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="col-4 col-md-6" >
                <button className="btn btn-raised btn-danger" >
                   {this.props.name}
                </button>
            </div>
        )
    }

}

export default Delete
