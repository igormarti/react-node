import React, { Component } from 'react'
import {singlePost,photoPost} from '../services/post_service'
import defaultPost from '../images/defaultpost.png'
import {Link} from 'react-router-dom'

class SinglePost extends Component {

  constructor(){
      super()
      this.state = {
          post:''
      }
  } 
  
  componentDidMount(){
    const postId = this.props.match.params.postId  
    singlePost(postId).then(data=>{
         if(data.error){
            console.log(data.error)
         }else{
            this.setState({post:data})
         }
    })
  }


  renderPost = (post) => {

    const posterId =  post.postedBy?`/user/${post.postedBy._id}`:''
    const posterName = post.postedBy?post.postedBy.name:"Unknown" 
        
      return(
        <div className="col-md-6 col-lg-6 col-12 mb-3 offset-lg-3 offset-md-3 justify-content-center align-items-center">
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
                    height:'200px'
                    }
                    }
                >
                </div>   
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.body}</p>
                    <p className='font-italic mark' >
                        Created by{" "}<Link to={posterId} >{posterName}</Link>{" "} 
                        on { new Date(post.created).toDateString()}
                    </p>
                </div>
                </div>
                <div>
                    <ul className="card-footer p-0 list-group list-group-flush">
                        <Link to='/' className="btn btn-raised btn-primary float-right m-0">Back to Home</Link>
                    </ul>
                </div>
        </div>
      )
  }

  render() {

    const {post} = this.state

    return (
      <div className="container col-12" >
          <h2 className="mt-5 mb-5 ml-5" >{post.title}</h2>
            {this.renderPost(post)}
      </div>
    )
  }
}

export default SinglePost
