import React, { Component } from 'react'
import {getPosts} from '../services/post_service'
import {photoUser} from '../services/user_service'
import defaultUserPhoto from '../images/defaultUser.jpg'
import {Link} from 'react-router-dom'


class Posts extends Component {

    constructor(props){
        super(props)
        this.state = {
            posts:[]
        }
    }

    componentDidMount(){
        getPosts().then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({
                    posts:data
                })
            }
        })
    }

    showPosts = posts => {
        return(
            <div className="row">
            {
                posts.map((post,i) => 
                {
                    const posterId =  post.postedBy?`/user/${post.postedBy._id}`:''
                    const posterName = post.postedBy?post.postedBy.name:"Unknown" 

                    return(
                        <div className="col-sm-4 col-lg-4 col-12 mb-3">
                            <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.body.substring(0,100)}</p>
                                <p className='font-italic mark' >
                                    Created by{" "}<Link to={posterId} >{posterName}</Link>{" "} 
                                    on { new Date(post.created).toDateString()}
                                </p>
                            </div>
                            </div>
                            <div>
                                <ul className="card-footer p-0 list-group list-group-flush">
                                    <Link to={`/post/${post._id}`} className="btn btn-raised btn-primary float-right m-0">Read more</Link>
                                </ul>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        )
    }
       
    

    render() {
        const {posts} = this.state

        return (
            <div>
            {
                this.showPosts(posts)
            }  
            </div>
        )
    }
}

export default Posts;
