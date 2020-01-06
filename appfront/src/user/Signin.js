import React, { Component } from 'react'
import Alert from '../alert/Alert'
import {Redirect} from 'react-router-dom'
import Loading from '../loading/Loading'
import {authenticate,singIn} from '../auth/auth'

export default class Signin extends Component {

    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:"",
            error:"",
            redirectToRefer:false,
            loading:false
        }
    }

    handleChange = field => e =>{
        this.setState({[field]:e.target.value,error:""})
    }

    submitForm = (e) => {

        this.setState({loading:true})

        e.preventDefault()

        const {email,password} = this.state

        const user = {email,password}

        singIn(user).then((data)=>{

            if(data.error){
                this.setState({error:data.error,loading:false})
            }else{
                //Authenticate
                authenticate(data,() => {
                    this.setState({redirectToRefer:true})
                })
            }

        })

    }

    signInForm = (email,password) => (
        <form>
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
                    Sing In
                </button>
            </div>
        </form>
    )

    render(){

        const {email,password,error,redirectToRefer,loading} = this.state

        if(redirectToRefer){
            return <Redirect to="/" />
        }

        return(
            <div className="container col-lg-12" >

                 <div className="col-12" >
                     <h2 className="mt-5 mb-5 justify-content-center align-items-center d-flex" >SignIn</h2>
                </div>    

                <div className="col-12 justify-content-center align-items-center d-flex" >
                    { (loading)?<Loading type="spokes" />:'' }   
                </div>

                {
                 error?(<Alert message={error} type="danger" />):''
                }

                <div className="col-lg-6 col-md-12 col-sm-12 offset-lg-3 justify-content-center align-items-center">
                    {this.signInForm(email,password)}
                </div>

            </div>
        );

    }

}