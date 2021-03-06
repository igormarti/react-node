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
import ForgetPassword from '../user/ForgetPassword'
import RecoveryPassword from '../user/RecoveryPassword'
import NewPost from '../post/NewPost'
import SinglePost from '../post/SinglePost'
import PostEdit from '../post/PostEdit'
import Admin from '../admin/Admin'
import PrivateRoute from '../auth/PrivateRoute'

const MainRouter = () => (
    <div>
        <Menu/>
        <Switch>  
            <Route exact path='/' component={Home} />
            <Route path='/signup' component={Signup} />
            <Route path='/signin' component={Signin} />
            <Route  path='/users' component={Users} />
            <Route  path='/forgetpassword' component={ForgetPassword} />
            <Route  path='/reset-password/:token' component={RecoveryPassword} />
            <PrivateRoute  path='/findpeople' component={FindPeople} />
            <PrivateRoute exact  path='/user/:userId' component={Profile} />
            <PrivateRoute  path='/user/edit/:userId' component={EditProfile} />
            <PrivateRoute  path='/post/create' component={NewPost} />
            <PrivateRoute exact path='/post/:postId' component={SinglePost} />
            <PrivateRoute  path='/post/edit/:postId' component={PostEdit} />
            <PrivateRoute exact path="/admin" component={Admin} />
        </Switch>
    </div>
)

export default MainRouter;