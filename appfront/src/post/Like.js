import React, { Component } from 'react'
import {likeByPost,unLike,like} from '../services/post_service'
import Auth from '../auth/auth'
import {Redirect} from 'react-router-dom'

class Like extends Component {

    state = {
      redirectSignIn:false,
      erro:'',
      like:false,
      likes:0,
    }


    componentDidMount(){
      const postId = this.props.postId
      likeByPost(postId).then(data=>{
           if(data.error){
              console.log(data.error)
           }else{
              this.setState({
                likes:data.Likes.length,
                like: this.checkLike(data.Likes),
              })
           }
      })
    }

    checkLike = (likes) => {
      const userId =  Auth() && Auth().user._id
      let match = likes.indexOf(userId) !== -1
      return match;
  }

  likeToggle = () => {

    if(!Auth()){
      this.setState({redirectSignIn:true})
      return false
    }

    let callApi =  this.state.like?unLike:like
    const postId = this.props.postId
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

  renderLike = (likes,like) => {
      return(
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
        )
  }

    render() {

      const {likes,like,redirectSignIn} =  this.state;

      if(redirectSignIn){
        return <Redirect to={'/signin'} />
      }
      
        return (
          <div>
              {this.renderLike(likes,like)}
          </div>
        )

    }   

}

export default Like