import React, { Component } from 'react'
import '../css/profiletabs.css'
import {photoUser} from '../services/user_service'
import defaultUserPhoto from '../images/userdefault.jpg'

class ProfileTabs extends Component {

  render() {

    const {followers,following} = this.props
    console.log(following);
    
    return (

       <div className="row mb-5" > 
       
            <div className="col-sm-6 col-lg-6">

                <h4 className="text-primary" >Following</h4>
              
                    {
                        following.length > 0?
                        following.map((person,i) => 
                        <div className="list list-row block" key={i}>
                            <div className="list-item" >
                                <div>
                                    <a href="#" data-abc="true">
                                        <span className="w-48 avatar gd-primary">
                                            <img src={photoUser(person._id,new Date().getTime())} alt={person.name}
                                                onError={i=> i.target.src = `${defaultUserPhoto}`}
                                            />
                                        </span>
                                    </a>
                                </div>
                                <div className="flex"> <a href="#" className="item-author text-color" data-abc="true">{person.name}</a>
                                    <div className="item-except text-muted text-sm h-1x">For what reason would it be advisable for me to think about business content?</div>
                                </div>
                                <div className="no-wrap">
                                    <div className="item-date text-muted text-sm d-none d-md-block">21 July</div>
                                </div>

                          </div> 
                          </div>
                       ):<p className="text-primary justify-content-center align-items-center d-flex border border-ligth rounded" >
                            no results      
                        </p>
                    }
               

            </div>


            <div className="col-sm-6 col-lg-6">

                <h4 className="text-primary" >Followers</h4>

                    {
                        followers.length > 0?
                        followers.map((person,i) => 
                        <div className="list list-row block" key={i}>
                            <div className="list-item" >
                                <div>
                                    <a href="#" data-abc="true">
                                        <span className="w-48 avatar gd-primary">
                                            <img src={photoUser(person._id,new Date().getTime())} alt={person.name}
                                                onError={i=> i.target.src = `${defaultUserPhoto}`}
                                            />
                                        </span>
                                    </a>
                                </div>
                                <div className="flex"> <a href="#" className="item-author text-color" data-abc="true">{person.name}</a>
                                    <div className="item-except text-muted text-sm h-1x">For what reason would it be advisable for me to think about business content?</div>
                                </div>
                                <div className="no-wrap">
                                    <div className="item-date text-muted text-sm d-none d-md-block">21 July</div>
                                </div>

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
