import React, { Component } from 'react'
import {getUsers} from '../services/user_service'
import defaultUserPhoto from '../images/userdefault.jpg'
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
        <div className="row justify-content-center mb-5" >
            {
                users.map((user,i) =>
                <div className="card text-dark col-lg 3 col-md-3 col-sm-12 col-xs-12 mr-md-2 mb-2" style={{width:'18rem'}} key={i} >
                    <img className="card-img-top" src={defaultUserPhoto} alt={`${user.name} photo's`} />
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link to={`user/${user._id}`} className="btn btn-raised btn-primary">View Profile</Link>
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
                     {this.showUsers(users)}
                </div>  
            </div>
        )
    }
}

export default Users;
