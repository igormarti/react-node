import React, { Component } from 'react'
import User from '../auth/auth'
import {Redirect} from 'react-router-dom'
import {userById} from '../services/user_service'

class Profile extends Component {

    constructor(props){
        super(props)
        this.state = {
            user:"",
            redirectTosignIn:false
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
                    user:data
                })
            }
        })
    }

    render(){

        const redirectTosignIn = this.state.redirectTosignIn

        if(redirectTosignIn){
            return <Redirect to='/signin' />
        }

        return(
            <div className="container col-lg-12" >

                <div className="col-12" >
                     <h2 className="mt-5 mb-5 ml-5" >Profile</h2>
                     <p className="ml-5" >Hello {User().user.name}</p>
                     <p className="ml-5" >Email: {User().user.email}</p>
                     <p className="ml-5" >Joined {new Date(User().user.created_at).toDateString()}</p>
                </div>   


            </div>    
        )
    }

}

export default Profile