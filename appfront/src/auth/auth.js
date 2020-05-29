const api_url = process.env.REACT_APP_API_URL;

export default function isAuthenticated(){

    if(typeof window == 'undefined') return false

    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
        return false
    }

}

export const authenticate = (jwt,next) => {

    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt',JSON.stringify(jwt))
        next()
    }

}

export const signOut = (next) => {

    if(typeof window !== 'undefined') localStorage.removeItem('jwt')
    next()
    return fetch(`${api_url}/signout`,{
        'method':'GET'
    }).then(res => {
        return res.json()
    }).catch(err=>{
        console.log(err)
    })

}

export const singIn = (user) => {
    
    return fetch(`${api_url}/signin`,{
                'method':'POST',
                'headers':{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                'body':JSON.stringify(user)
            }).then(res=>{
                return res.json()
            })
}

export const signUp = (user) => {

    return  fetch(
            `${api_url}/signup`,
            {
                 'method':'POST',
                 'headers':{
                     'Accept':'application/json',
                     'Content-Type':'application/json'
                 },
                 'body':JSON.stringify(user)
             }
             ).then((res)=>{
                 return res.json()
             })
 }

 export const sendNewPassword = (email) => {
    return fetch(`${api_url}/forgot-password`,{
        'method':'PUT',
        'headers':{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        'body':JSON.stringify({email})
    }).then(res => {return res.json()})
    .catch(err => console.log(err))
}

export const recoveryPassword = (body) => {
    return fetch(`${api_url}/reset-password`,{
        'method':'PUT',
        'headers':{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        'body':JSON.stringify(body)
    }).then(res => {return res.json()})
    .catch(err => console.log(err))
}

export const socialLogin = user => {
    return fetch(`${process.env.REACT_APP_API_URL}/social-login/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        // credentials: "include", // works only in the same origin
        body: JSON.stringify(user)
    })
        .then(response => {
            console.log("signin response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};