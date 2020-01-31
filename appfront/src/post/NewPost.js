import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {createPost} from '../services/post_service'
import User from '../auth/auth'
import Alert from '../alert/Alert'
import Loading from "../loading/Loading";

class NewPost extends Component{

    constructor(){
        super()
        this.state = {
            title:'',
            body:'',
            photo:'',
            user:'',
            error:'',
            loading:false,
            fileSize:0,
            redirectToProfile:false
        }
    }

    componentDidMount(){
        this.postData = new FormData()
        this.setState({user:User().user})
    }

    handleChange = field => e =>{
        const value = field==='photo'?e.target.files[0]:e.target.value
        const fileSize = field==='photo'?e.target.files[0].size:0
        this.setState({[field]:value,error:"",fileSize})
        this.postData.set(field,value)
    }

    submitForm = (e) => {
        e.preventDefault()
        if(this.isValid()){
            const userId = User().user._id
            this.setState({loading:true})
            createPost(userId,this.postData).then(data => {
                this.setState({loading:false})
                if(data.error){
                    this.setState({
                        error:data.error
                    })
                }else{
                    this.setState({
                        redirectToProfile:true,
                        photo:'',
                        title:'',
                        body:''
                    })
                }
            })
            
        }

    }

    isValid(){
        const {title,body,fileSize} = this.state
        
        if(title.length === 0){
            this.setState({error:'Title is required'})
            return false
        }

        if(body.length === 0){
            this.setState({error:'Body is required'})
            return false
        }

        if(fileSize > 200000){
            this.setState({error:'Upload size should be less than 200kb'})
            return false
        }

        return true
    }

    newPostForm = (title,body) => (
        <form>
            <div className="form-group">
                <label className="text-muted" >Photo</label>
                <input accept="image/*" type="file" onChange={this.handleChange('photo')} className="form-control" ></input>
            </div>
            <div className="form-group">
                <label className="text-muted" >Title</label>
                <input type="text" value={title} onChange={this.handleChange('title')} className="form-control" ></input>
            </div>
            <div className="form-group">
                <label className="text-muted" >Body</label>
                <textarea value={body} onChange={this.handleChange('body')} className="form-control" />   
            </div>
            <div className="justify-content-center align-items-center d-flex">
                <button  onClick={this.submitForm} className="btn btn-raised btn-primary btn-lg" >
                    Create Post
                </button>
            </div>
        </form>
    )

    render(){

        const {title,body,error,loading,user,redirectToProfile} = this.state
        if(redirectToProfile){
            return <Redirect to={`/user/${user._id}`} />
        }

        return(

            <div className='container' >
                <h2 className="mt-5 mb-5 ml-5" >Create Post</h2>

                {
                 error?(<Alert message={error} type="danger" />):''
                }

                <div className="col-12 justify-content-center align-items-center d-flex" >
                    { (loading)?<Loading type="spokes" />:'' }   
                </div> 

                <div className="col-lg-6 col-md-12 col-sm-12 offset-lg-3 justify-content-center align-items-center">
                    {this.newPostForm(title,body)}
                </div>
            </div>
        )
    }

}

export default NewPost;