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
    console.log(user)
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
