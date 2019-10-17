const express = require('express')
const {signin,signup,signout,userById,allUsers} = require('../controller/user')
const Auth = require('../middleware/auth')
const router = express.Router()
const validator = require('../validator/user')

router.post("/signup",validator.createSingUpValidation,signup)
router.post("/signin",validator.createSingInValidation,signin)
router.get("/signout",signout)
router.get("/users",allUsers)

router.param('userId',userById)

module.exports = router;
