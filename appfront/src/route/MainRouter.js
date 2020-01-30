import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from '../core/Home'
import Menu from '../core/Menu'
import Signup from '../user/Signup';
import Signin from '../user/Signin';
import Profile from '../user/Profile';
import Users from '../user/Users';
import EditProfile from '../user/EditProfile'
import FindPeople from '../user/FindPeople'
import PrivateRoute from '../auth/PrivateRoute'

const MainRouter = () => (
    <div>
        <Menu/>
        <Switch>
            <Route exact path='/' component={Home} ></Route>
            <Route path='/signup' component={Signup} ></Route>
            <Route path='/signin' component={Signin} ></Route>
            <PrivateRoute exact  path='/user/:userId' component={Profile} ></PrivateRoute>
            <Route  path='/users' component={Users} ></Route>
            <PrivateRoute  path='/user/edit/:userId' component={EditProfile} ></PrivateRoute>
            <PrivateRoute  path='/user/findpeople/:userId' component={FindPeople} ></PrivateRoute>
        </Switch>
    </div>
)

export default MainRouter;