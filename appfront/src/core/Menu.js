import React from 'react'
import {Link,withRouter} from 'react-router-dom'


const isActive = (history,path) => {
    if(history.location.pathname===path){
        return '#ff9900'
    }else{
        return '#fff'
    }
}

export const signOut = (next) =>{
    if(typeof window !== 'undefined') localStorage.removeItem('jwt')
    next()
    return fetch('http://127.0.0.1:2523/signout',{
        'method':'GET'
    }).then(res => {
        return res.json()
    }).catch(err=>{
        console.log(err)
    })
}

const Menu = ({history}) => (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
            <Link className="navbar-brand" to="/" style={{color:isActive(history,'/')}} >Home</Link>
            <Link className="navbar-brand" to="/signup" style={{color:isActive(history,'/signup')}}  >Sign Up</Link>
            <Link className="navbar-brand" to="/signin" style={{color:isActive(history,'/signin')}} >Sign In</Link>
            <a  className="navbar-brand" onClick={()=> signOut(()=>history.push('/signin'))} >
                Sign Out
            </a>
        </nav>
    </div>
)


export default withRouter(Menu)