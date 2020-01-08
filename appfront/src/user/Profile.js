import React, { Component } from 'react'
import User from '../auth/auth'

class Profile extends Component {

    constructor(props){
        super(props)
        this.state = {
            user:"",
            redirectTosignIn:false
        }
    }

    componentDidMount(){
         console.log(this.props.match.params.userId)   
    }

    render(){
        return(
            <div className="container col-lg-12" >

                <div className="col-12" >
                     <h2 className="mt-5 mb-5 ml-5" >Profile</h2>
                     <p className="ml-5" >Hello {User().user.name}</p>
                     <p className="ml-5" >Email: {User().user.email}</p>
                </div>   


            </div>    
        )
    }

}

export default Profile