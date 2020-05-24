import React, { Component } from 'react'
import {singlePost,photoPost,removePost, unLike,like} from '../services/post_service'
import Auth from '../auth/auth'
import defaultPost from '../images/defaultpost.png'
import {Link,Redirect} from 'react-router-dom'
import Loading from '../loading/Loading'
import Comment from  './Comment'

class SinglePost extends Component {

  constructor(){
      super()
      this.state = {
          post:'',
          redirectToHome:false,
          redirectSignIn:false,
          erro:'',
          like:false,
          likes:0,
          comments:[]
      }
  } 


  checkLike = (likes) => {
      const userId =  Auth() && Auth().user._id
      let match = likes.indexOf(userId) !== -1
      return match;
  }
  
  componentDidMount(){
    const postId = this.props.match.params.postId  
    singlePost(postId).then(data=>{
         if(data.error){
            console.log(data.error)
         }else{
            this.setState({
              post:data,
              likes:data.Likes.length,
              like: this.checkLike(data.Likes),
              comments:data.Comments
            })
         }
    })
  }

  confirmDelete = () => {
      let answer = window.confirm('You are sure want to delete your post?')

      if(answer){
        this.deletePost()
      }
  }

  deletePost = () => {

     const postId = this.props.match.params.postId

     removePost(postId).then(data => {

        if(data.error){
            this.setState({error:data.error})
        }else{
            this.setState({redirectToHome:true})
        }

     })

  }

  likeToggle = () => {

    if(!Auth()){
      this.setState({redirectSignIn:true})
      return false
    }

    let callApi =  this.state.like?unLike:like
    const postId = this.state.post._id
    const userId = Auth().user._id
     callApi(postId,userId).then(data => {
          if(data.error){
            console.log(data.error)
          }else{
            this.setState({
              like:!this.state.like,
              likes:data.Likes.length
            })
          }
    })
  }


  renderPost = (post) => {

    const posterId =  post.postedBy?`/user/${post.postedBy._id}`:''
    const posterName = post.postedBy?post.postedBy.name:"Unknown" 
    const {likes,like} =  this.state;
        
      return(
        <div className="col-md-8 col-lg-8 col-12 mb-3">
                <div className="card">
                    
                <div 
                style={
                    {
                    backgroundImage: `url(${photoPost(post._id,new Date().getTime())}),url(${defaultPost})`, 
                    backgroundPosition: 'center center',
                    backgroundColor: '#333333',
                    backgroundSize:'cover',
                    backgroundRepeat: 'no-repeat',
                    width:'100%',
                    height:'30rem'
                    }
                    }
                >
                </div>   
                {
                  like?(
                    <h6 className="mt-3 ml-3" onClick={this.likeToggle}>
                      {likes} Like
                      <i  className="fa fa-thumbs-up text-dark bg-success ml-2" style={{padding:'10px',borderRadius:'50%'}} ></i>
                    </h6>
                  )
                  :
                  (
                      <h6 className="mt-3 ml-3" onClick={this.likeToggle}>
                        {likes} Like
                        <i  className="fa fa-thumbs-up text-light bg-dark ml-2" style={{padding:'10px',borderRadius:'50%'}} > </i>
                      </h6>
                  )
                }
               
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.body}</p>
                    <p className='font-italic mark' >
                        Created by{" "}<Link to={posterId} >{posterName}</Link>{" "} 
                        on { new Date(post.created).toDateString()}
                    </p>
                    <div className='row'>
                    <div className="col-lg-4" >
                      <Link to='/' className="btn btn-raised btn-primary col-12">Back to Home</Link>
                    </div>
                    {
                     Auth().user && Auth().user._id === post.postedBy._id && ( 
                       <>
                        <div className="col-lg-4" >
                          <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-warning col-12" >
                            Update
                          </Link>
                        </div>
                        <div className="col-lg-4" >
                          <button onClick={this.confirmDelete} className="btn btn-raised btn-danger col-12" >Delete</button>
                        </div>
                      </>      
                     )
                    }
                </div>
                </div>
                </div>
                
        </div>
      )
  }

  updateComments = comments => {
    this.setState({comments})
  }

  render() {

    const {post,redirectToHome,redirectSignIn,comments} = this.state

    if(redirectToHome){
      return <Redirect to={'/'} />
    }else if(redirectSignIn){
      return <Redirect to={'/signin'} />
    }

    return (
     
        <div className="container col-12" >
              {!post
              ?(
                <div className="col-md-6 col-lg-6 col-12 mt-5 offset-lg-5 offset-md-5 justify-content-center align-items-center">
                    <Loading type="spokes" />
                </div>
              )
              :(
                <>
                  <h2 className="mt-5 mb-5 ml-5" >{post.title}</h2>
                  <div className="row mb-5" >
                    {this.renderPost(post)}
                    <Comment postId={post._id} comments={comments} updateComments={this.updateComments} />
                  </div>
                </>
              )
             }
              
        </div>       
    )
  }
}

export default SinglePost
