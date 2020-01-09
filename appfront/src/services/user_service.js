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