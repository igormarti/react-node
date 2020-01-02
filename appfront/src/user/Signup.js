import React, { Component } from 'react'
import Alert from '../alert/Alert'

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
        this.signUp(user).then(data => {
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

    signUp = (user) => {

       return  fetch(
               'http://127.0.0.1:2523/signup',
               {
                    'method':'POST',
                    'headers':{
                        'Accept':'application/json',
                        'Content-type':'application/json'
                    },
                    'body':JSON.stringify(user)
                }
                ).then((res)=>{
                    return res.json()
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
            <button  onClick={this.submitForm} className="btn btn-raised btn-primary btn-lg offset-5" >Submit</button>
        </form>
    )
    
    render() {

        const {name,email,password,error,success} = this.state;

        return (
            <div className="container col-lg-12" >

                <div className="col-12" >
                     <h2 className="mt-5 mb-5 justify-content-center align-items-center d-flex" >Signup</h2>
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
