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

    showPosts = posts => (
        <div className="row">
            {
                posts.map((post,i) => 
                <div class="col-sm-4 col-lg-4 col-12 mb-3">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{post.title}</h5>
                        <p class="card-text">{post.body}</p>
                    </div>
                    </div>
                    <div>
                        <ul className="card-footer p-0 list-group list-group-flush">
                            <Link to={`/post/${post._id}`} className="btn btn-raised btn-primary float-right m-0">Read more</Link>
                        </ul>
                    </div>
                </div>
                )
            }
        </div>
    )

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
