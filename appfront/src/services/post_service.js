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
                // 'Authorization':`Bearer ${User().token}`
            }
            }).then(res=>{
                return res.json()
            }).catch(err=>{
                console.log(err)
            })
}

export const singlePost = (postId) => {
    return fetch(`${URL_API}/post/${postId}`,
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

export const postByUser = (userId) => {
    return fetch(`${URL_API}/posts/by/${userId}`,
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

export const removePost = (postId) => {
    return fetch(`${URL_API}/post/${postId}`,
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

export const updatePost = (postId,post) => {
    return fetch(`${URL_API}/post/${postId}`,
        {
            'method':'PUT',
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

export const like = (postId,userId) => {
    return fetch(`${URL_API}/post/like`,
        {
            'method':'PUT',
            'headers':{
                'Accept':'application/json',
                "Content-Type": "application/json",
                'Authorization':`Bearer ${User().token}`
            },
            'body':JSON.stringify({postId,userId})
        }
    ).then(res => {
        return res.json()
    }).catch(err => {
        console.log(err)
    })
}

export const unLike = (postId,userId) => {
    return fetch(`${URL_API}/post/unlike`,
        {
            'method':'PUT',
            'headers':{
                'Accept':'application/json',
                "Content-Type": "application/json",
                'Authorization':`Bearer ${User().token}`
            },
            'body':JSON.stringify({postId,userId})
        }
    ).then(res => {
        return res.json()
    }).catch(err => {
        console.log(err)
    })
}

export const commentPost = (postId,userId,comment) => {
    return fetch(`${URL_API}/post/comment`,
        {
            'method':'PUT',
            'headers':{
                'Accept':'application/json',
                "Content-Type": "application/json",
                'Authorization':`Bearer ${User().token}`
            },
            'body':JSON.stringify({postId,userId,comment})
        }
    ).then(res => {
        return res.json()
    }).catch(err => {
        console.log(err)
    })
}

export const unCommentPost = (postId,userId,comment) => {
    return fetch(`${URL_API}/post/uncomment`,
        {
            'method':'PUT',
            'headers':{
                'Accept':'application/json',
                "Content-Type": "application/json",
                'Authorization':`Bearer ${User().token}`
            },
            'body':JSON.stringify({postId,userId,comment}),
        }
    ).then(res => {
        return res.json()
    }).catch(err => {
        console.log(err)
    })
}

export const list = (page,perpage=3) => {
    return fetch(`${URL_API}/?page=${page}&perpage=${perpage}`, {
        method: "GET",
        'headers':{
            'Content-Type':'application/json',
            'Accept':'application/json'
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const likeByPost = postId => {
    return fetch(`${URL_API}/post/likes/${postId}`, {
        method: "GET",
        'headers':{
            'Content-Type':'application/json',
            'Accept':'application/json',
            'Authorization':`Bearer ${User().token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const photoPost = (postId,dateTime='') => {
    const datetime = dateTime !== '' ? `?${dateTime}` : ''
    return `${URL_API}/post/photo/${postId}${datetime}`
}