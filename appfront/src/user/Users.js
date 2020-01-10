import React, { Component } from 'react'
import {getUsers} from '../services/user_service'

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

    render() {
        const {users} = this.state

        return (
            <div className="container col-lg-12" >
                <div className="col-12" >
                     <h2 className="mt-5 mb-5 ml-5" >Users</h2>
                        <div className="card" >
                            {
                                users.map((user,i)=>(
                                    <div key={i} >
                                           <p>{user.name}</p> 
                                    </div>    
                                ))
                            }  
                        </div>

                </div>
            </div>
        )
    }
}

export default Users;
