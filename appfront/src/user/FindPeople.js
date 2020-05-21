import React, { Component } from 'react'
import {photoUser,findPeople,follow} from '../services/user_service'
import Auth from '../auth/auth'
import defaultUserPhoto from '../images/defaultUser.jpg'
import {Link} from 'react-router-dom'
import Alert from '../alert/Alert'


class Users extends Component {

    constructor(props){
        super(props)
        this.state = {
            users:[],
            hasSuggestion:true,
            error:'',
        }
    }

    componentDidMount(){

        let userId = Auth().user._id
        findPeople(userId).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({
                    users:data,
                    hasSuggestion:data.length?true:false
                })
            }
        })
    }

    followUser = (person,i) => {

        let userId = Auth().user._id
        follow(userId,person._id).then((data)=>{
            if(data.error){
                this.setState({error:data.error})
            }else{
               let Persons = this.state.users
               Persons.splice(i,1)
               this.setState({
                   users:Persons,
                   hasSuggestion:this.state.users.length?true:false
               }) 
            }
        })


    }

    showUsers = users => (
        <div className="card-deck" >
            {
                users.map((user,i) =>
                <div className="card text-dark mr-md-2 mb-2 col-md-4 col-lg-4" key={i} >
                        {/* <img className="card-img-top" src={photoUser(user._id,new Date().getTime())} 
                        alt={`${user.name} photo's`} 
                        style={{width:'100%'}}
                        onError={i=> i.target.src = `${defaultUserPhoto}`} /> */}
                        <div 
                        style={
                            {
                                backgroundImage: `url(${photoUser(user._id,new Date().getTime())}), url(${defaultUserPhoto})`, 
                                backgroundPosition: 'center center',
                                backgroundColor: '#333333',
                                backgroundSize:'cover',
                                backgroundRepeat: 'no-repeat',
                                width:'100%',
                                height:'200px'
                                }
                            }></div>
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}</p>
                    </div>
                    <div>
                        <div className="card-footer">
                            <div className="row">
                                <Link to={`/user/${user._id}`} className="btn btn-raised btn-primary col-12">View Profile</Link>
                                <button onClick={()=>this.followUser(user,i)} className="btn btn-raised btn-info col-12" >
                                    Follow
                                </button>
                            </div>   
                        </div>
                    </div>
                </div>
                )
            }
        </div>
    )

    render() {
        const {users,error,hasSuggestion} = this.state

        return (
            <div className="container" >
                <div className="col-12" >
                     <h2 className="mt-5 mb-5 ml-5" >Suggested People</h2>   
                        {
                           !hasSuggestion?<Alert type="info" message="We currently have no suggestions for you." />:''
                        }   

                        {
                            error?<Alert type="danger" message="Erro trying to get suggestions." />:''
                        }

                        {
                           this.showUsers(users)
                        }  
                </div>
            </div>
        )
    }
}

export default Users;
