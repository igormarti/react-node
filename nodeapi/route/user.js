const express = require('express')
const {
        signin
        ,signup
        ,signout
        ,userById
        ,allUsers
        ,getUser
        ,updateUser
        ,deleteUser
    } = require('../controller/user')
const Auth = require('../middleware/auth')
const router = express.Router()
const {createSingInValidation,createSingUpValidation} = require('../validator/user')

//User routers
router.post("/signup",createSingUpValidation,signup)
router.post("/signin",createSingInValidation,signin)
router.get("/signout",signout)
router.get("/users",allUsers)
router.get('/user/:userId',Auth.HasPermission ,getUser)
router.put('/user/:userId',Auth.HasPermission,updateUser)
router.delete('/user/:userId',Auth.HasPermission,deleteUser)

//Router for user params
router.param('userId',userById)

module.exports = router;
