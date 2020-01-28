import React, { Component } from 'react'
import Alert from '../alert/Alert'
import {signUp} from '../auth/auth'

export default class Signup extends Component {

    constructor(props){
        super(props)
        this.state = 
        {
            name:"",
            email:"",
            password:"",
            error:"",
            success:false
        }

    }

    handleChange = field => e =>{
        this.setState({[field]:e.target.value,error:""})
    }

    submitForm = e => {
        e.preventDefault()
        //Destructing object user of the state
        const {name,email,password} = this.state
        //Create object user for send to back-end
        const user = {name,email,password}
        //Executing request http to back-end
        signUp(user).then(data => {
            if(data.error)  this.setState({error:data.error,success:false})
                
            else this.setState({
                        name:'',
                        email:'',
                        password:'',
                        error:'',
                        success:true,
                    })
            
        })
    }

    signUpForm = (name,email,password) => (
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
                    Submit
                </button>
            </div>
        </form>
    )
    
    render() {

        const {name,email,password,error,success} = this.state;

        return (
            <div className="container col-lg-12" >

                <div className="col-12" >
                     <h2 className="mt-5 mb-5 justify-content-center align-items-center d-flex" >SignUp</h2>
                </div>

                {
                 error?(<Alert message={error} type="danger" />):''
                }

                {
                 success?(<Alert message=" Account was created with success, please sign in." type="success" />):''
                }

                <div className="col-lg-6 col-md-12 col-sm-12 offset-lg-3 justify-content-center align-items-center">
                    {this.signUpForm(name,email,password)}
                </div>

            </div>
        )
    }
}
