import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {singlePost,updatePost,photoPost} from '../services/post_service'
import auth from '../auth/auth'
import Alert from '../alert/Alert'
import Loading from '../loading/Loading'
import defaultPost from '../images/defaultpost.png'

class PostEdit extends Component {

  constructor(){
     super()
     this.state = {
       id:'',
       title:'',
       body:'',
       error:'',
       redirectToPost:false,
       loading:false
     }
  }

  componentDidMount(){
    const postId = this.props.match.params.postId
    this.postData = new FormData()
    this.init(postId)
  }

  init = postId => {
      singlePost(postId).then(data => {
          if(data.error){
            this.setState({
               error:data.error
            }) 
          }else{
            this.setState({
              id:data._id,
              title:data.title,
              body:data.body
            }) 
          }
      })
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

        const {id} = this.state

        this.setState({loading:true})
        updatePost(id,this.postData).then(data => {
            this.setState({loading:false})
            if(data.error){
                this.setState({
                    error:data.error
                })
            }else{
                this.setState({
                    id: data.postedBy._id,
                    redirectToPost:true,
                    title:data.title,
                    body:data.body
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

  updatePostForm = (title,body) => (
      <form className="mt-5" >
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
              <button onClick={this.submitForm} className="btn btn-raised btn-primary btn-lg" >
                  Update Post
              </button>
          </div>
      </form>
  )


  render() {

    const {id,title,body,error,loading,redirectToPost} = this.state

    if(redirectToPost){
        return <Redirect to={`/post/${id}`} />
    }

    return (
        <div className="container col-12" >

            <h2 className="mt-5 mb-5 ml-5" >{title}</h2>

            {
              error?(<Alert message={error} type="danger" />):''
            }

            <div className="col-12 justify-content-center align-items-center d-flex" >
                { (loading)?<Loading type="spokes" />:'' }   
            </div> 
            

            <div className="col-lg-6 col-md-12 col-sm-12 offset-lg-3 justify-content-center align-items-center">
                <div 
                    style={
                        {
                        backgroundImage: `url(${photoPost(id,new Date().getTime())}),url(${defaultPost})`, 
                        backgroundPosition: 'center center',
                        backgroundColor: '#333333',
                        backgroundSize:'cover',
                        backgroundRepeat: 'no-repeat',
                        width:'100%',
                        height:'200px',
                        borderRadius:'3px',
                        border:'3px solid #4F4F4F'
                        }
                        }
                ></div>
                
                {/* {this.updatePostForm(title,body)} */}
                {auth().user.role === "admin" &&
                    this.updatePostForm(title, body)}

                {auth().user._id === id &&
                    this.updatePostForm(title, body)}
            </div> 
       </div>
    )
  }
}

export default PostEdit
