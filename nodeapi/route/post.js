const express = require('express')
const {getPosts,createPosts} = require('../controller/post')
const router = express.Router()
const validator = require('../validator/post')

router.get("/",getPosts)
router.post("/posts",validator.createPostValidation,createPosts)

module.exports = router;
