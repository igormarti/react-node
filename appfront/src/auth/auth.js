
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
    return fetch('http://127.0.0.1:2523/signout',{
        'method':'GET'
    }).then(res => {
        return res.json()
    }).catch(err=>{
        console.log(err)
    })

}

export const singIn = (user) => {

    return fetch('http://127.0.0.1:2523/signin',{
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
            'http://127.0.0.1:2523/signup',
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

