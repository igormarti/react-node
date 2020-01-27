import React, { Component } from 'react'
import {deleteUser} from '../services/user_service'
import {signOut} from '../auth/auth'
import {Redirect} from 'react-router-dom'

class Delete extends Component {

    state = {
        redirectToSignIn:false
    }

    constructor(props){
        super(props)
    }

    deleteAccount = () => {
        deleteUser(this.props.userId).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                signOut(()=>{
                    this.setState({
                        redirectToSignIn:true
                    })
                })
            }
        })
    }

    confirmDelete = () => {
       let answer = window.confirm('You are sure want to delete your account?')

       if(answer){
         this.deleteAccount()
       }
    }

    render() {

        if(this.state.redirectToSignIn){
            return <Redirect to='/signin' />
        }

        return (
            <div className="col-4 col-md-6 col-lg-7" >
                <button onClick={this.confirmDelete} className="btn btn-raised btn-danger" >
                   {this.props.name}
                </button>
            </div>
        )
    }

}

export default Delete
