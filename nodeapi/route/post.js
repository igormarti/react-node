const express = require('express')
const {getPosts,createPosts,getPostsByUser,postById} = require('../controller/post')
const {userById} = require('../controller/user')
const router = express.Router()
const {createPostValidation} = require('../validator/post')
const {HasPermission} = require('../middleware/auth')

router.get("/",HasPermission,getPosts)
router.post("/posts/new/:userId", HasPermission,createPosts,createPostValidation)
router.get("/posts/by/:userId", HasPermission,getPostsByUser)

router.param('userId',userById)
router.param('postId',postById)

module.exports = router;
