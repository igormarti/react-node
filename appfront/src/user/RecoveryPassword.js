import React, { Component } from 'react'
import Alert from '../alert/Alert'
import Loading from '../loading/Loading'
import {recoveryPassword} from '../auth/auth'

export default class RecoveryPassword extends Component {

    constructor(props){
        super(props)
        this.state = {
            email:"",
            error:"",
            success:"",
            newPassword:"",
            loading:false
        }
    }

    handleChange = field => e =>{
        this.setState({[field]:e.target.value,error:""})
    }

    submitForm = (e) => {

        this.setState({loading:true})

        e.preventDefault()

        const {newPassword} = this.state
        const resetPasswordLink =  this.props.match.params.token

        recoveryPassword({newPassword,resetPasswordLink}).then(data => {
          
            if(data.error){
                this.setState({error:data.error,success:'',loading:false,newPassword:''})
                return false;
            }

            this.setState({success:data.message,error:'',loading:false,newPassword:''})
        })

    }

    recoveryPasswordForm = (newPassword) => (
        <form>
            <div className="form-group">
                <label className="text-muted" >New Password</label>
                <input type="password" value={newPassword} onChange={this.handleChange('newPassword')} className="form-control" ></input>
                <small className="text-nowrap font-weight-bold"  >enter your new password.</small>
            </div>
            <div className="justify-content-center align-items-center d-flex">
                <button  onClick={this.submitForm} className="btn btn-raised btn-primary btn-lg" >
                   Reset Password
                </button>
            </div>
        </form>
    )

    render(){

        const {newPassword,error,success,loading} = this.state

        return(
            <div className="container col-lg-12" >

                 <div className="col-12" >
                     <h2 className="mt-5 mb-5 justify-content-center align-items-center d-flex" >Reset Password</h2>
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
                    {this.recoveryPasswordForm(newPassword)}
                </div>

            </div>
        );

    }

}