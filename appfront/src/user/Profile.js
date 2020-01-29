import React, { Component } from 'react'
import User from '../auth/auth'
import {Redirect,Link} from 'react-router-dom'
import {userById,photoUser} from '../services/user_service'
import defaultUserPhoto from '../images/userdefault.jpg'
import Delete from './Delete'
import FollowProfileButton from './FollowProfileButton'


class Profile extends Component {

    constructor(props){
        super(props)
        this.state = {
            user:{Following:[],Followers:[]},
            redirectTosignIn:false,
            following:false,
            error:''
        }
    }

    componentDidMount(){
        const userId = this.props.match.params.userId 
        this.init(userId)
    }

    componentWillReceiveProps(props){
        const userId = props.match.params.userId 
        this.init(userId)
    }

    init = userId => {
        userById(userId).then(data=>{
            if(data.error){
                this.setState({
                    redirectTosignIn:true
                })
            }else{
                let following = this.checkFollow(data)
                this.setState({
                    user:data,
                    following
                })
            }
        })
    }

    clickFollowButton = callbackApi => {
        const userId = User().user._id
        callbackApi(userId,this.state.user._id).then(data=>{
            if(data.error){
                this.setState({error:data.error})
            }else{
                this.setState({
                    user:data,
                    following:!this.state.following
                })
            }
        })
    } 

    checkFollow = user => {
        let jwt = User()
        let match = user.Followers.find( follower => {
            return follower._id === jwt.user._id
        })
        return match
    }

    render(){

        const {redirectTosignIn,user} = this.state

        if(redirectTosignIn){
            return <Redirect to='/signin' />
        }

        const photoURL = user._id?photoUser(user._id,new Date().getTime()):defaultUserPhoto

        return(
            <div className="container col-12" >
                <h2 className="mt-5 mb-5 ml-5" >Profile</h2>
                <div className="row" >
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-5" >

                         <div className="card offset-lg-5 offset-md-3 offset-1" style={{width:'18rem'}}>

                            <img className="figure-img img-fluid rounded"
                            src={photoURL} alt={`${user.name}`}
                            onError={i=> i.target.src = `${defaultUserPhoto}`}
                            />
                      
                            <div className="card-body">
                                <h3 className='text-dark' >About</h3>
                                <p className="card-text text-dark">.
                                    {user.about || `Hello, I'm ${user.name}`}
                                </p>
                            </div>
                        </div>    
                
                    </div>  

                    <div className="col-lg-6 col-md-6 col-sm-12" >
                        <div className="lead" >
                        <p className="ml-5" >Hello {user.name}</p>
                        <p className="ml-5" >Email: {user.email}</p>
                        <p className="ml-5" >Joined {new Date(user.created_at).toDateString()}</p>
                    </div>

                    {
                        User().user && User().user._id === user._id ? (
                            <div className='row justify-content-center mb-5'>
                                    <div className="col-5 col-md-4 col-lg-3">
                                        <Link className='btn btn-raised btn-success btn-sm' to={`/user/edit/${user._id}`}>
                                            Edit Profile
                                        </Link>
                                    </div>
                                    <Delete name="Delete" userId={user._id} />  
                            </div>  
                        ):
                        (
                            <FollowProfileButton 
                                onClickButton={this.clickFollowButton}
                                following={this.state.following}
                            />
                        )
                    } 
                    </div>
                    
                </div>


            </div>    
        )
    }

}

export default Profile