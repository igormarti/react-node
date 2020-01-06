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
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
            <Link className="navbar-brand" to="/" style={{color:isActive(history,'/')}} >Home</Link>
            
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
                        <a  className="navbar-brand" 
                            onClick={()=> signOut(()=>history.push('/signin'))} >
                            Sign Out
                        </a> 
                        <a  className="navbar-brand" >
                            {isAuthenticated().user.name}
                        </a> 
                    </>
                )
        
            }
            
        </nav>
    </div>
)


export default withRouter(Menu)