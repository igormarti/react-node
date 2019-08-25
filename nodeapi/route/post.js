const express = require('express')
const postController = require('../controller/post')
const router = express.Router()

router.get("/",postController.getPosts)
router.post("/posts",postController.createPosts)

module.exports = router;
