import React, { Component } from 'react'
import {getUsers,photoUser} from '../services/user_service'
import defaultUserPhoto from '../images/defaultUser.jpg'
import {Link} from 'react-router-dom'


class Users extends Component {

    constructor(props){
        super(props)
        this.state = {
            users:[]
        }
    }

    componentDidMount(){
        getUsers().then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({
                    users:data
                })
            }
        })
    }

    showUsers = users => (
        <div className="card-deck" >
            {
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
            }
        </div>
    )

    render() {
        const {users} = this.state

        return (
            <div className="container" >
                <div className="col-12" >
                     <h2 className="mt-5 mb-5 ml-5" >Users</h2>                   
                        {
                           this.showUsers(users)
                        }  
                </div>
            </div>
        )
    }
}

export default Users;
