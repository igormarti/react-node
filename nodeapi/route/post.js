const express = require('express')
const {getPosts,createPosts} = require('../controller/post')
const {userById} = require('../controller/user')
const router = express.Router()
const validator = require('../validator/post')
const {HasPermission} = require('../middleware/auth')

router.get("/",HasPermission,getPosts)
router.post("/posts", HasPermission,validator.createPostValidation,createPosts)

router.param('userId',userById)

module.exports = router;
