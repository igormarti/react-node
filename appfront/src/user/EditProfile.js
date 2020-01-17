import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {userById,updateUser} from '../services/user_service'
import Alert from '../alert/Alert'

class EditProfile extends Component{

    constructor(props){
        super(props)
        this.state = {
            id:'',
            name:'',
            email:'',
            password:'',
            error:'',
            redirectToProfile:false
        }
    }

    componentDidMount(){
        const userId =  this.props.match.params.userId 
        userById(userId).then(data=>{
            if(data.error){
                this.setState({
                    redirectToProfile:true
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

    handleChange = field => e =>{
        this.setState({[field]:e.target.value,error:""})
    }

    submitForm = (e) => {
        e.preventDefault()
        //Destructing object user of the state
        const {id,name,email,password} = this.state
        //Create object user for send to back-end
        const user = {
           name,
           email,
           password:password || undefined
        }

        updateUser(id,user).then(data => {
            if(data.error){
                this.setState({
                    error:data.error
                })
            }else{
                this.setState({
                    redirectToProfile:true
                })
            }
        })

    }

    updateUserForm = (name,email,password) => (
        <form>
            <div className="form-group">
                <label className="text-muted" >Name</label>
                <input type="text" value={name} onChange={this.handleChange('name')} className="form-control" ></input>
            </div>
            <div className="form-group">
                <label className="text-muted" >Email</label>
                <input type="email" value={email} onChange={this.handleChange('email')} className="form-control" ></input>
            </div>
            <div className="form-group">
                <label className="text-muted" >Password</label>
                <input type="password" value={password} onChange={this.handleChange('password')} className="form-control" ></input>
            </div>
            <div className="justify-content-center align-items-center d-flex">
                <button  onClick={this.submitForm} className="btn btn-raised btn-primary btn-lg" >
                    Update
                </button>
            </div>
        </form>
    )

    render(){

        const {id,name,email,password,error,redirectToProfile} = this.state

        if(redirectToProfile){
            return <Redirect to={`/user/${id}`} />
        }

        return(

            <div className='container' >
                <h2 className="mt-5 mb-5 ml-5" >Edit Profile</h2>

                {
                 error?(<Alert message={error} type="danger" />):''
                }

                <div className="col-lg-6 col-md-12 col-sm-12 offset-lg-3 justify-content-center align-items-center">
                    {this.updateUserForm(name,email,password)}
                </div>
            </div>
        )
    }

}

export default EditProfile;