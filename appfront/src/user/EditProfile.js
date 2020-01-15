import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {userById} from '../services/user_service'

class EditProfile extends Component{

    constructor(props){
        super(props)
        this.state = {
            id:'',
            name:'',
            email:'',
            password:'',
        }
    }

    componentDidMount(){
        const userId =  this.props.match.params.userId 
        userById(userId).then(data=>{
            if(data.error){
                this.setState({
                    redirectTosignIn:true
                })
            }else{
                this.setState({
                    id:data._id,
                    name:data.name,
                    email:data.email,
                })
            }
        })
    }

    render(){

        const {redirectTosignIn} = this.state

        if(redirectTosignIn){
            return <Redirect to='/' />
        }

        return(
            <div className='container' >
                <h2 className="mt-5 mb-5 ml-5" >Edit Profile</h2>
            </div>
        )
    }

}

export default EditProfile;