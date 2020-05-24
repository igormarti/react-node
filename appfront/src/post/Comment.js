import React, { Component } from 'react'
import {commentPost,unCommentPost} from '../services/post_service'
import {photoUser} from '../services/user_service'
import Auth from '../auth/auth'
import {Link} from 'react-router-dom'
import defaultUserPhoto from '../images/userdefault.jpg'
import Alert from '../alert/Alert'

class Comment extends Component {

    state = {
        text:'',
        error:''
    }


    handleChange = e => {
        this.setState({
            text:e.target.value
        })
    }

    isValid = () => {
        const {text} = this.state

        if(!Auth()){
            this.setState({error:'Please, singin to leave a comment.'})
            return false
        }

        if(!text.length > 0 || text.length >150){
            this.setState({error:'Comment should not be empty and less than 150 characters long.'})
            return false
        }

        return true
    }

    addComment = e =>{
        e.preventDefault()
        if(this.isValid()){
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
    }

    confirmDelete = (comment) => {
        let answer = window.confirm('You are sure want to delete your comment?')
  
        if(answer){
          this.deleteComment(comment)
        }
    }
  
    deleteComment = (comment) => {
  
        const userId = Auth().user._id
        const postId = this.props.postId
        unCommentPost(postId,userId,comment).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                this.props.updateComments(data.Comments)
            }
        })     
  
    }

    render() {

        const {text,error} = this.state
        const {comments} = this.props

        return (
            <div className="mt-3 mb-5 col-md-4 col-lg-4 col-12">
               
                <form onSubmit={this.addComment} >
                    <div className="row">
                        <div className="col-12">
                          <input onChange={this.handleChange} value={text} type="text" className="form-control" placeholder="Leave a comment..."  />  
                        </div>
                        {
                            error!==''?
                            <Alert message={error} type='danger' lg='12' offset_lg='0' />
                            :''
                        }
                    </div>    
                </form>
              
                <div className="col-12" style={{overflowY:'auto',height:'400px'}}>
                <h5 className="text-primary" >{comments.length} Comments</h5>
                    {
                        comments.length > 0?
                        comments.map((comment,i) => 
                        <div className="list list-row block" key={i}>
                            <div className="list-item row" >
                               
                                    <div className="col-2">
                                        <span className="w-48 avatar gd-primary">
                                            <img src={photoUser(comment.postedBy._id,new Date().getTime())} alt={comment.postedBy.name}
                                                onError={i=> i.target.src = `${defaultUserPhoto}`}
                                                className='border border-primary'
                                            />
                                        </span>
                                    </div>
                                    <div className="flex col-10"> 
                                        <p href="#" style={{fontSize:'16px'}} className="item-author text-color lead text-justify" >{comment.text}</p>
                                    </div>
                                
                          </div> 

                           <div className="row">
                                <div className="flex col-10 mt-2">
                                    <small className='font-italic mark' >
                                        Created by{" "}<Link to={`/user/${comment.postedBy._id}`} >{comment.postedBy.name}</Link>{" "} 
                                        on { new Date(comment.created).toDateString()}
                                    </small>
                                </div>
                                <div className="col-2">
                                    {
                                        Auth().user && Auth().user._id === comment.postedBy._id && ( 
                                        <>
                                            <div className="col-12" >
                                                <i  onClick={()=>{this.confirmDelete(comment)}}  className="fa fa-trash text-success mr-1" style={{padding:'10px',borderRadius:'50%'}} > </i>
                                            </div>
                                        </>      
                                        )
                                    }
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