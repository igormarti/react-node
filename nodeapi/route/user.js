const express = require('express')
const {signin,signup,signout,userById,allUsers,getUser} = require('../controller/user')
const Auth = require('../middleware/auth')
const router = express.Router()
const validator = require('../validator/user')

router.post("/signup",validator.createSingUpValidation,signup)
router.post("/signin",validator.createSingInValidation,signin)
router.get("/signout",signout)
router.get("/users",allUsers)
router.get('/user/:userId',Auth.HasPermission ,getUser)

router.param('userId',userById)

module.exports = router;
