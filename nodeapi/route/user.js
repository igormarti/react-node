const express = require('express')
const {singup} = require('../controller/user')
const router = express.Router()
// const validator = require('../validator/post')

router.post("/singup",singup)


module.exports = router;
