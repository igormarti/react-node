import React, { Component } from 'react'
import User from '../auth/auth'
import {Redirect,Link} from 'react-router-dom'
import {userById,photoUser} from '../services/user_service'
import defaultUserPhoto from '../images/userdefault.jpg'
import Delete from './Delete'


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

    componentWillReceiveProps(props){
        const userId = props.match.params.userId 
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

        const photoURL = user._id?photoUser(user._id):defaultUserPhoto

        return(
            <div className="container col-12" >
                <h2 className="mt-5 mb-5 ml-5" >Profile</h2>
                <div className="row" >
                    <div className="col-lg-6 col-md-6 col-sm-12" >
                       
                            <img className="img-fluid col-md-ml-3"
                            style={{width:'80%'}} 
                            src={photoURL} alt={`${user.name}`}
                            onError={i=> i.target.src = `${defaultUserPhoto}`}
                            />
                
                    </div>  

                    <div className="col-lg-6 col-md-6 col-sm-12" >
                        <div className="lead" >
                        <p className="ml-5" >Hello {user.name}</p>
                        <p className="ml-5" >Email: {user.email}</p>
                        <p className="ml-5" >Joined {new Date(user.created_at).toDateString()}</p>
                        </div>

                    {
                        User().user && User().user._id === user._id && (
                            <div className='row justify-content-center'>
                                    <div className="col-5 col-md-3">
                                        <Link className='btn btn-raised btn-success btn-sm' to={`/user/edit/${user._id}`}>
                                            Edit Profile
                                        </Link>
                                    </div>
                                    <Delete name="Delete" userId={user._id} />  
                            </div>  
                        )
                    } 
                    </div>
                    
                </div>


            </div>    
        )
    }

}

export default Profile