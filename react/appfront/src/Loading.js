import React, { Component } from 'react';

class Loading extends Component {

    constructor(props){
        super(props)
        this.state = {message:props.message}
    }

    render(){

        return(
            <h2>{this.state.message}</h2>
        )

    }

}

export default Loading;