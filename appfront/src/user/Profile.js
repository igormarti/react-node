import React, { Component } from 'react'
import User from '../auth/auth'
import {Redirect,Link} from 'react-router-dom'
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

        const {redirectTosignIn,user} = this.state

        if(redirectTosignIn){
            return <Redirect to='/signin' />
        }

        return(
            <div className="container col-lg-12" >

                <div className="row" >
                    <div className="col-lg-6 col-md-6" >
                        <h2 className="mt-5 mb-5 ml-5" >Profile</h2>
                        <p className="ml-5" >Hello {User().user.name}</p>
                        <p className="ml-5" >Email: {User().user.email}</p>
                        <p className="ml-5" >Joined {new Date(User().user.created_at).toDateString()}</p>
                    </div>  
                    {
                        User().user && User().user._id === user._id && (
                            <div className="col-lg-6 col-md-6" >
                                <div className="d-inline-block mt-5">

                                </div>    
                                <Link className='btn btn-raised btn-success mr-5' to={`/user/edit/${user._id}`}>
                                    Edit Profile
                                </Link>
                                <button className="btn btn-raised btn-danger">
                                    Delete Profile
                                </button>
                            </div>
                        )
                    } 
                    
                </div>


            </div>    
        )
    }

}

export default Profile