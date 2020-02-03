import User from '../auth/auth'

const URL_API = process.env.REACT_APP_API_URL

export const createPost = (userId,post) => {
    return fetch(`${URL_API}/posts/new/${userId}`,
        {
            'method':'POST',
            'headers':{
                'Accept':'application/json',
                'Authorization':`Bearer ${User().token}`
            },
            'body':post
        }
    ).then(res => {
        return res.json()
    }).catch(err => {
        console.log(err)
    })
}

export const getPosts = () => {
    return fetch(`${URL_API}/`,
            {
            'method':'GET',
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