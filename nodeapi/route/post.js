const express = require('express')
const {getPosts,createPosts,getPostsByUser,postById,deletePost,updatePost,singlePost,photo} = require('../controller/post')
const {userById} = require('../controller/user')
const router = express.Router()
const {createPostValidation} = require('../validator/post')
const {HasPermission,hasAuthorizationPost} = require('../middleware/auth')

router.get("/",getPosts)
router.post("/posts/new/:userId", HasPermission,createPosts,createPostValidation)
router.get("/posts/by/:userId", HasPermission,getPostsByUser)
router.get("/post/:postId", HasPermission,singlePost)
router.delete('/post/:postId',HasPermission,hasAuthorizationPost,deletePost)
router.put('/post/:postId',HasPermission,hasAuthorizationPost,updatePost)
router.get('/post/photo/:postId',photo)

router.param('userId',userById)
router.param('postId',postById)

module.exports = router;
