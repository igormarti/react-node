import User from '../auth/auth'

const URL_API = process.env.REACT_APP_API_URL

export const userById = userId => {
    return fetch(`${URL_API}/user/${userId}`,
            {
                'method':'GET',
                'headers':{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${User().token}`
                }
            }
            ).then(res => {
                return res.json()
            }).catch(err => {
                console.log(err)
            })
}

export const getUsers = () => {
    return fetch(`${URL_API}/users`,
            {
            'method':'GET',
            'headers':{
                'Content-Type':'application/json',
                'Accept':'application/json',
            }
            }).then(res=>{
                return res.json()
            }).catch(err=>{
                console.log(err)
            })
}

export const deleteUser = userId => {
    return fetch(`${URL_API}/user/${userId}`,
            {
            'method':'DELETE',
            'headers':{
                'Content-Type':'application/json',
                'Accept':'application/json',
                'Authorization':`Bearer ${User().token}`
            }
            }).then(res=>{
                return res.json()
            }).catch(err=>{
                console.log(err)
            })
}

export const updateUser = (userId,user) => {
    return fetch(`${URL_API}/user/${userId}`,
    {
        'method':'PUT',
        'headers':{
            //'Content-Type':'application/json',
            'Accept':'application/json',
            'Authorization':`Bearer ${User().token}`
        },
        'body':user
    }).then(res => {return res.json()})
    .catch(err => console.log(err))
}

export const updateUserLocal = (user,next) => {
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('jwt')){
            let auth = JSON.parse(localStorage.getItem('jwt'))
            auth.user = user
            localStorage.setItem('jwt',JSON.stringify(auth))
            next()
        }
    }
}

export const follow = (userId,followId) => {
    return fetch(`${URL_API}/user/follow`,
    {
        'method':'PUT',
        'headers':{
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Authorization':`Bearer ${User().token}`
        },
        'body':JSON.stringify({userId,followId})
    }).then(res => {return res.json()})
    .catch(err => console.log(err))
}

export const unFollow = (userId,unfollowId) => {
    return fetch(`${URL_API}/user/unfollow`,
    {
        'method':'PUT',
        'headers':{
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Authorization':`Bearer ${User().token}`
        },
        'body':JSON.stringify({userId,unfollowId})
    }).then(res => {return res.json()})
    .catch(err => console.log(err))
}

export const findPeople = (userId) => {
    return fetch(`${URL_API}/user/findpeople/${userId}`,
    {
        'method':'GET',
        'headers':{
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Authorization':`Bearer ${User().token}`
        },
        'body':JSON.stringify({userId})
    }).then(res => {return res.json()})
    .catch(err => console.log(err))
}

export const photoUser = (userId,dateTime='') => {
    const datetime = dateTime !== '' ? `?${dateTime}` : ''
    return `${URL_API}/user/photo/${userId}${datetime}`
}
