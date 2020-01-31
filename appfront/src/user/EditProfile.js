import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {userById,updateUser,updateUserLocal,photoUser} from '../services/user_service'
import Alert from '../alert/Alert'
import Loading from "../loading/Loading";
import defaultUserPhoto from '../images/userdefault.jpg'

class EditProfile extends Component{

    constructor(props){
        super(props)
        this.state = {
            id:'',
            name:'',
            email:'',
            password:'',
            about:'',
            error:'',
            redirectToProfile:false,
            loading:false,
            fileSize:0
        }
    }

    componentDidMount(){
        const userId =  this.props.match.params.userId 
        this.userData = new FormData()
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
                    about:data.about
                })
            }
        })
    }

    handleChange = field => e =>{
        const value = field==='photo'?e.target.files[0]:e.target.value
        const fileSize = field==='photo'?e.target.files[0].size:0
        this.setState({[field]:value,error:"",fileSize})
        this.userData.set(field,value)
    }

    submitForm = (e) => {
        e.preventDefault()
        if(this.isValid()){
            this.setState({loading:true})
            updateUser( this.state.id,this.userData).then(data => {
                if(data.error){
                    this.setState({
                        error:data.error
                    })
                }else{
                    updateUserLocal(data,()=>{
                        this.setState({
                            redirectToProfile:true
                        })  
                    })
                }
            })
            
        }

    }

    isValid(){
        const {name,email,password,fileSize} = this.state
        
        if(name.length === 0){
            this.setState({error:'Name is required'})
            return false
        }

        if(fileSize > 200000){
            this.setState({error:'Upload size should be less than 200kb'})
            return false
        }

        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            this.setState({error:'Email valid is required'})
            return false
        }

        if(password.length >= 1 && password.length < 6){
            this.setState({error:'Password must be at least 6 characters long'})
            return false 
        }

        return true
    }

    updateUserForm = (name,email,password,about) => (
        <form>
            <div className="form-group">
                <label className="text-muted" >Profile Photo</label>
                <input accept="image/*" type="file" onChange={this.handleChange('photo')} className="form-control" ></input>
            </div>
            <div className="form-group">
                <label className="text-muted" >Name</label>
                <input type="text" value={name} onChange={this.handleChange('name')} className="form-control" ></input>
            </div>
            <div className="form-group">
                <label className="text-muted" >Email</label>
                <input type="email" value={email} onChange={this.handleChange('email')} className="form-control" ></input>
            </div>
            <div className="form-group">
                <label className="text-muted" >About</label>
                <textarea value={about} onChange={this.handleChange('about')} className="form-control" />   
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

        const {id,name,email,password,about,error,redirectToProfile,loading} = this.state

        if(redirectToProfile){
            return <Redirect to={`/user/${id}`} />
        }

        const photoURL = id?photoUser(id,new Date().getTime()):defaultUserPhoto

        return(

            <div className='container' >
                <h2 className="mt-5 mb-5 ml-5" >Edit Profile</h2>

                {
                 error?(<Alert message={error} type="danger" />):''
                }

                <div className="col-12 justify-content-center align-items-center d-flex" >
                    { (loading)?<Loading type="spokes" />:'' }   
                </div> 
                <div className="col-md-4 offset-md-4 justify-content-center align-items-center d-flex mb-2" >
                    <figure className="figure">
                        <img src={photoURL} className="figure-img img-fluid rounded" alt={name}
                        onError={i=> i.target.src = `${defaultUserPhoto}`}
                        />
                    </figure>
                </div>     

                <div className="col-lg-6 col-md-12 col-sm-12 offset-lg-3 justify-content-center align-items-center">
                    {this.updateUserForm(name,email,password,about)}
                </div>
            </div>
        )
    }

}

export default EditProfile;