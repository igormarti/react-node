import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import {authenticate,socialLogin} from '../auth/auth'
const id_client = process.env.REACT_APP_ID_CLIENT_GOOGLE;

class SocialLogin extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            redirectToReferrer:false
        }
    }

    responseGoogle = response => {
        const {email,name,googleId,imageUrl} = response.profileObj
        const user = {
            password: googleId,
            name: name,
            email: email,
            imageUrl: imageUrl
        }

        socialLogin(user).then(data => {
            console.log("signin data: ", data);
            if (data.error) {
                console.log("Error Login. Please try again..");
            } else {
                console.log("signin success - setting jwt: ", data);
                authenticate(data, () => {
                    this.setState({ redirectToReferrer: true });
                });
            }
        });
    };

    render() {

        // redirect
        const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <GoogleLogin
                    clientId={id_client}
                    buttonText='Login with Google'
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                />
            </div>
        )
    }
}

export default SocialLogin
