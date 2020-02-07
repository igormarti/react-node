import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../css/profiletabs.css'
import {photoUser} from '../services/user_service'
import {photoPost} from '../services/post_service'
import defaultUserPhoto from '../images/userdefault.jpg'
import defaultPost from '../images/defaultpost.png'

class ProfileTabs extends Component {

  render() {

    const {followers,following,posts} = this.props
    
    return (

       <div className="row mb-5" > 
       
            <div className="col-md-3 col-lg-3 col-12">

                <h5 className="text-primary" >Following</h5>
              
                    {
                        following.length > 0?
                        following.map((person,i) => 
                        <div className="list list-row block" key={i}>
                            <div className="list-item" >
                                <Link to={`/user/${person._id}`} className="d-flex" >
                                    <div>
                                        <span className="w-48 avatar gd-primary">
                                            <img src={photoUser(person._id,new Date().getTime())} alt={person.name}
                                                onError={i=> i.target.src = `${defaultUserPhoto}`}
                                                className='border border-primary'
                                            />
                                        </span>
                                    </div>
                                    <div className="flex ml-2"> 
                                        <p href="#" className="item-author text-color lead" >{person.name}</p>
                                    </div>
                                </Link>
                          </div> 
                          </div>
                       ):<p className="text-primary justify-content-center align-items-center d-flex border border-ligth rounded" >
                            no results      
                        </p>
                    }
               

            </div>


            <div className="col-md-3 col-lg-3 col-12">

                <h5 className="text-primary" >Followers</h5>

                    {
                        followers.length > 0?
                        followers.map((person,i) => 
                        <div className="list list-row block" key={i}>
                            <div className="list-item" >
                                <Link to={`/user/${person._id}`} className="d-flex" >
                                    <div>
                                        <span className="w-48 avatar gd-primary">
                                            <img src={photoUser(person._id,new Date().getTime())} alt={person.name}
                                                onError={i=> i.target.src = `${defaultUserPhoto}`}
                                                className='border border-primary'
                                            />
                                        </span>
                                    </div>
                                    <div className="flex ml-2"> 
                                        <p href="#" className="item-author text-color lead" >{person.name}</p>
                                    </div>
                                </Link>
                          </div> 
                        </div>
                       )
                       : <p className="text-primary justify-content-center align-items-center d-flex border border-ligth rounded" >
                            no results      
                        </p>
                       
                    }
                    

            </div>


            <div className="col-md-6 col-lg-6 col-12">

            <h5 className="text-primary" >Posts</h5>

                {
                    posts.length > 0?
                    posts.map((post,i) => 

                    <div className="card" key={i}>
                        <div className="row" >
                            {/* <Link to={`/user/${person._id}`} className="d-flex" > */}
                                <div className="col-lg-4">
                                   
                                        {/* <img src={photoPost(post._id,new Date().getTime())} alt={post.title}
                                            onError={i=> i.target.src = `${defaultPost}`}
                                            
                                        /> */}
                                        <div 
                                        style={
                                            {
                                            backgroundImage: `url(${photoPost(post._id,new Date().getTime())}),url(${defaultPost})`, 
                                            backgroundPosition: 'center center',
                                            backgroundColor: '#333333',
                                            backgroundSize:'cover',
                                            backgroundRepeat: 'no-repeat',
                                            width:'100%',
                                            height:'100%'
                                            }
                                            }
                                        >
                                        </div> 
                                </div>
                                <div className="col-lg-8"> 
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <p href="#" className="item-author post-title text-color lead" >{post.title}</p>
                                        </div>  
                                        <div className="col-lg-5 mt-4">
                                            <Link to={`/post/${post._id}`} className="btn btn-primary btn-raised" >Read more</Link>
                                        </div>     
                                    </div>
                                </div>
                            {/* </Link> */}
                        </div> 
                    </div>

                    )
                : <p className="text-primary justify-content-center align-items-center d-flex border border-ligth rounded" >
                        no results      
                  </p>
                
                }
    

            </div>

        
        </div>
    )
  }

}

export default ProfileTabs
