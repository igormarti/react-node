import React, { Component } from 'react'
import {photoPost,list} from '../services/post_service'
import defaultPost from '../images/defaultpost.png'
import {Link} from 'react-router-dom'


class Posts extends Component {

    constructor(props){
        super(props)
        this.state = {
            posts:[],
            page:1,
            totPages:0
        }
    }

    componentDidMount(){
        this.loadPosts(this.state.page);
    }

    loadMore = number => {
        this.setState({ page: this.state.page + number });
        this.loadPosts(this.state.page + number);
    };
 
    loadLess = number => {
        this.setState({ page: this.state.page - number });
        this.loadPosts(this.state.page - number);
    };

    loadPosts = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({posts: data.posts,totPages:data.totPages});
            }
        });
    };

    showPosts = (posts) => {

        const {totPages,page} =  this.state

        return(
            <div className="row">
            {
                posts.map((post,i) => 
                {
                    const posterId =  post.postedBy?`/user/${post.postedBy._id}`:''
                    const posterName = post.postedBy?post.postedBy.name:"Unknown" 

                    return(
                        <div className="col-sm-4 col-lg-4 col-12 mb-3" key={i}>
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
                                <p className="card-text">{post.body.substring(0,30)}{post.body.length>30?` ...`:``}</p>
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


                <div className="col-12">
                    {page > 1 ? (
                    <button
                        className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
                        onClick={() => this.loadLess(1)}
                    >
                        Previous - {page-1}
                    </button>
                ) : (
                    ""
                )}
 
                {posts.length && (page < totPages)? (
                    <button
                        className="btn btn-raised btn-success mt-5 mb-5"
                        onClick={() => this.loadMore(1)}
                    >
                        Next - {page+1}
                    </button>
                ) : (
                    ""
                )}
                </div>

            </div>
        )
    }
       
    

    render() {
        const {posts} = this.state

        return (
            <div>
                <h2 className="mt-5 mb-5 ml-5" >{posts.length?'Recents Post':'Loading...'}</h2>
            {
                this.showPosts(posts)
            }  
            </div>
        )
    }
}

export default Posts;
