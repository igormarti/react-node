import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../css/profiletabs.css'
import {photoUser} from '../services/user_service'
import defaultUserPhoto from '../images/userdefault.jpg'

class ProfileTabs extends Component {

  render() {

    const {followers,following,posts} = this.props
    
    return (

       <div className="row mb-5" > 
       
            <div className="col-sm-6 col-lg-3">

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


            <div className="col-sm-6 col-lg-3">

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


            <div className="col-sm-6 col-lg-4">

            <h5 className="text-primary" >Posts</h5>

                {
                    posts.length > 0?
                    (<div>{JSON.stringify(posts)}</div>)
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
