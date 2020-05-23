import React, { Component } from 'react'
import {commentPost} from '../services/post_service'
import {photoUser} from '../services/user_service'
import Auth from '../auth/auth'
import {Link} from 'react-router-dom'
import defaultUserPhoto from '../images/userdefault.jpg'

class Comment extends Component {

    state = {
        text:''
    }


    handleChange = e => {
        this.setState({
            text:e.target.value
        })
    }

    addComment = e =>{
        e.preventDefault()
        const userId = Auth().user._id
        const postId = this.props.postId
        const comment = {text:this.state.text}
        commentPost(postId,userId,comment).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({text:''})
                this.props.updateComments(data.Comments)
            }
        })
    }

    render() {

        const {text} = this.state
        const {comments} = this.props

        return (
            <div className="mt-3 mb-5">
               
                <form onSubmit={this.addComment} >
                    <div className="row">
                        <div className="col-md-8 col-lg-8 col-12 offset-md-2 offset-lg-2">
                          <input onChange={this.handleChange} value={text} type="text" className="form-control" placeholder="Leave a comment..."  />  
                        </div>  
                    </div>    
                </form>
              
                <div className="col-md-8 col-lg-8 col-12 offset-md-2 offset-lg-2">
                <h5 className="text-primary" >{comments.length} Comments</h5>
                    {
                        comments.length > 0?
                        comments.map((comment,i) => 
                        <div className="list list-row block" key={i}>
                            <div className="list-item row" >
                               
                                    <div className="col-1">
                                        <span className="w-48 avatar gd-primary">
                                            <img src={photoUser(comment.postedBy._id,new Date().getTime())} alt={comment.postedBy.name}
                                                onError={i=> i.target.src = `${defaultUserPhoto}`}
                                                className='border border-primary'
                                            />
                                        </span>
                                    </div>
                                    <div className="flex col-8"> 
                                        <p href="#" style={{fontSize:'16px'}} className="item-author text-color lead text-justify" >{comment.text}</p>
                                    </div>
                                    <div className="flex col-4 mt-2">
                                        <small className='font-italic mark' >
                                            Created by{" "}<Link to={`/user/${comment.postedBy._id}`} >{comment.postedBy.name}</Link>{" "} 
                                            on { new Date(comment.created).toDateString()}
                                        </small>
                                    </div>
                                
                          </div> 
                          </div>
                       ):<p className="text-primary justify-content-center align-items-center d-flex border border-ligth rounded" >
                            no comments      
                        </p>
                    }
               

            </div>



            </div>
        )
    }

}

export default Comment