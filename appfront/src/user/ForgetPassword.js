import React, { Component } from 'react'
import Alert from '../alert/Alert'
import Loading from '../loading/Loading'
import {sendNewPassword} from '../auth/auth'

export default class ForgetPassword extends Component {

    constructor(props){
        super(props)
        this.state = {
            email:"",
            error:"",
            success:"",
            loading:false
        }
    }

    handleChange = field => e =>{
        this.setState({[field]:e.target.value,error:""})
    }

    submitForm = (e) => {

        this.setState({loading:true})

        e.preventDefault()

        const {email} = this.state

        sendNewPassword(email).then(data => {
          
            if(data.error){
                this.setState({error:data.error,success:'',loading:false,})
                return false;
            }

            this.setState({success:data.message,error:'',loading:false,email:''})
        })

    }

    sendEmailForm = (email) => (
        <form>
            <div className="form-group">
                <label className="text-muted" >Email</label>
                <input type="email" value={email} onChange={this.handleChange('email')} className="form-control" ></input>
                <small className="text-nowrap font-weight-bold"  >enter your account email address to have your new password sent.</small>
            </div>
            <div className="justify-content-center align-items-center d-flex">
                <button  onClick={this.submitForm} className="btn btn-raised btn-primary btn-lg" >
                    Send email
                </button>
            </div>
        </form>
    )

    render(){

        const {email,error,success,loading} = this.state

        return(
            <div className="container col-lg-12" >

                 <div className="col-12" >
                     <h2 className="mt-5 mb-5 justify-content-center align-items-center d-flex" >Send me the new password</h2>
                </div>    

                <div className="col-12 justify-content-center align-items-center d-flex" >
                    { (loading)?<Loading type="spokes" />:'' }   
                </div>

                {
                 error?(<Alert message={error} type="danger" />):''
                }

                {
                 success?(<Alert message={success} type="success" />):''
                }

                <div className="col-lg-6 col-md-12 col-sm-12 offset-lg-3 justify-content-center align-items-center">
                    {this.sendEmailForm(email)}
                </div>

            </div>
        );

    }

}