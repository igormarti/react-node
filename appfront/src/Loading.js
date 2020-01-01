import React, { Component } from 'react';

class Loading extends Component {

    constructor(props){
        super(props)
        this.state = {message:props.message}
    }

    render(){

        return(
            <h3>{this.state.message}</h3>
        )

    }

}

export default Loading;