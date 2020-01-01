import React, { Component } from 'react'

export default class Signup extends Component {

    constructor(props){
        super(props)
        this.state = 
        {
            name:"",
            email:"",
            password:"",
            error:""
        }
    }

    handleChange = field => e =>{
        this.setState({[field]:e.target.value})
    }

    submitForm = e => {
        e.preventDefault()
        
        //Destructing object user of the state
        const {name,email,password} = this.state
        //Create object user for send to back-end
        const user = {name,email,password}
        //Executing request http to back-end
        fetch(
            'http://127.0.0.1:2523/signup',
            {
                'method':'POST',
                'headers':{
                    'Accept':'application/json',
                    'Content-type':'application/json'
                },
                'body':JSON.stringify(user)
            }
        ).then(res=>{
            return res.json()
        }).catch(error=>{
            console.log(error);
            
        })
    }
    
    render() {

        const {name,email,password} = this.state;

        return (
            <div className="container col-lg-12" >
                <div className="col-12" >
                     <h2 className="mt-5 mb-5 justify-content-center align-items-center d-flex" >Signup</h2>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 offset-lg-3 justify-content-center align-items-center">
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
                </div>
            </div>
        )
    }
}
