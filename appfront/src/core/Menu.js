import React from 'react'
import {Link,withRouter} from 'react-router-dom'
import isAuthenticated,{signOut} from '../auth/auth'

const isActive = (history,path) => {
    if(history.location.pathname===path){
        return '#ff9900'
    }else{
        return '#fff'
    }
}

const Menu = ({history}) => (
    <div>
        <nav className="navbar navbar-expand-sm  navbar-light bg-primary">
        <Link className="navbar-brand" to="/" style={{color:isActive(history,'/')}} >Home</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Alterna navegação">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
                <Link className="navbar-brand" to="/users" style={{color:isActive(history,'/users')}} >
                    Users
                </Link>
                <Link className="navbar-brand" style={{color:isActive(history,`/post/create`)}}
                        to={`/post/create`} 
                        >
                            Create Post
                </Link>
            {
                !isAuthenticated() && (
                    <>
                        <Link className="navbar-brand" to="/signup" style={{color:isActive(history,'/signup')}} >
                            Sign Up
                        </Link>
                        <Link className="navbar-brand" to="/signin" style={{color:isActive(history,'/signin')}} >
                            Sign In
                        </Link>
                    </>
                )
            }

            {
                 isAuthenticated() && (
                    <>
                        <Link className="navbar-brand" style={{color:isActive(history,`/findpeople`)}}
                        to={`/findpeople`} 
                        >
                            Suggested People
                        </Link>
                    </>
                )
            }

            {
                isAuthenticated() && (
                    <>
                        <Link className="navbar-brand" style={{color:isActive(history,`/user/${isAuthenticated().user._id}`)}}
                        to={`/user/${isAuthenticated().user._id}`} 
                        >
                            {`${isAuthenticated().user.name}'s profile`}
                        </Link>

                        <a className="navbar-brand" style={{color:'#fff'}}
                            onClick={()=> signOut(()=>history.push('/signin'))} >
                            Sign Out
                        </a> 
                    </>
                )
        
            }

            {isAuthenticated() && isAuthenticated().user.role === "admin" && (
                <>
                    <Link
                        to={`/admin`}
                        style={{color:isActive(history, `/admin`)}}
                        className="navbar-brand"
                    >
                        Admin
                    </Link>
                </>
            )}
        </div>
        </nav>
    </div>
)


export default withRouter(Menu)