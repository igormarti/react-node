import React, { Component } from "react";
import auth from '../auth/auth'
import {getPosts,photoPost} from '../services/post_service'
import {getUsers,photoUser} from '../services/user_service'
import defaultPost from '../images/defaultpost.png'
import defaultUserPhoto from '../images/defaultUser.jpg'
import {Link,Redirect} from 'react-router-dom'
 
class Admin extends Component {

    constructor(props){
        super(props)
        this.state = {
            users:[],
            posts:[],
            isLogged:true
        }
    }

    componentDidMount(){
        
        this.setState({isLogged:auth()?true:false})

        this.loadPosts()
        this.loadUsers()
    }

    loadUsers = () =>{
        getUsers().then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({users:data})
            }
        })
    }

    loadPosts= () =>{
        getPosts().then((data)=>{
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({posts:data})
            }
        })
    }

    showUsers = users => (
        <div className="card-deck" >
            {
                users.length?
                users.map((user,i) =>
                <div className="card text-dark mr-md-2 mb-2" key={i} >
                        {/* <img className="card-img-top" src={photoUser(user._id,new Date().getTime())} 
                        alt={`${user.name} photo's`} 
                        style={{width:'100%'}}
                        onError={i=> i.target.src = `${defaultUserPhoto}`} /> */}
                        <div 
                        style={
                            {
                                backgroundImage: `url(${photoUser(user._id,new Date().getTime())}), url(${defaultUserPhoto})`, 
                                backgroundPosition: 'center center',
                                backgroundColor: '#333333',
                                backgroundSize:'cover',
                                backgroundRepeat: 'no-repeat',
                                width:'100%',
                                height:'200px'
                                }
                            }></div>
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}</p>
                    </div>
                    <div>
                        <ul className="card-footer p-0 list-group list-group-flush">
                            <Link to={`user/${user._id}`} className="btn btn-raised btn-primary float-right m-0">View Profile</Link>
                        </ul>
                    </div>
                </div>
                )
              :
              <h3>Users is empty</h3> 
            }
        </div>
    )

    showPosts = posts => {
        return(
            <div className="row">
            {
                posts.length?
                posts.map((post,i) => 
                {
                    const posterId =  post.postedBy?`/user/${post.postedBy._id}`:''
                    const posterName = post.postedBy?post.postedBy.name:"Unknown" 

                    return(
                        <div className="col-sm-4 col-lg-4 col-12 mb-3" key={i}>
                            <div className="card">
                                
                            <div 
                             style={
                                {
                                backgroundImage: `url(${photoPost(post._id,new Date().getTime())}),url(${defaultPost})`, 
                                backgroundPosition: 'center center',
                                backgroundColor: '#333333',
                                backgroundSize:'cover',
                                backgroundRepeat: 'no-repeat',
                                width:'100%',
                                height:'200px'
                                }
                                }
                            >
                            </div>   
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.body.substring(0,30)}{post.body.length>30?` ...`:``}</p>
                                <p className='font-italic mark' >
                                    Created by{" "}<Link to={posterId} >{posterName}</Link>{" "} 
                                    on { new Date(post.created).toDateString()}
                                </p>
                            </div>
                            </div>
                            <div>
                                <ul className="card-footer p-0 list-group list-group-flush">
                                    <Link to={`/post/${post._id}`} className="btn btn-raised btn-primary float-right m-0">Read more</Link>
                                </ul>
                            </div>
                        </div>
                    )
                })
                :
                <h3>Posts is empty</h3>
            }
            </div>
        )
    }

    render() {

        const {users,posts,isLogged} = this.state

        if(!isLogged){
            return <Redirect to='/signin' />
        }

        return (
            <div>
                <div className="jumbotron">
                    <h2>Admin Dashboard</h2>
                    <p className="lead">Welcome to React Frontend</p>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <h2 className="mt-5 mb-5 ml-5" >{posts.length?'Posts':'Loading...'}</h2>
                            <hr/>
                            {
                                this.showPosts(posts)
                            }  
                        </div>
                        <div className="col-md-6">
                            <h2 className="mt-5 mb-5 ml-5" >{posts.length?'Users':'Loading...'}</h2>
                            <hr/>
                            {
                                this.showUsers(users)
                            }  
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Admin;