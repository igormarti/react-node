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
        ,photoUser
        ,addFollowing
        ,addFollower
        ,removeFollowing
        ,removeFollower
        ,findPeople
    } = require('../controller/user')
const Auth = require('../middleware/auth')
const router = express.Router()
const {createSingInValidation,createSingUpValidation} = require('../validator/user')

//User routers
router.put('/user/follow',Auth.HasPermission,addFollowing,addFollower)
router.put('/user/unfollow',Auth.HasPermission,removeFollowing,removeFollower)
router.post("/signup",createSingUpValidation,signup)
router.post("/signin",createSingInValidation,signin)
router.get("/signout",signout)


router.get("/user/findpeople/:userId",Auth.HasPermission,findPeople)
router.get("/users",allUsers)
router.get('/user/:userId',Auth.HasPermission ,getUser)
router.put('/user/:userId',Auth.HasPermission,updateUser)
router.delete('/user/:userId',Auth.HasPermission,deleteUser)
router.get('/user/photo/:userId',photoUser)

//Router for user params
router.param('userId',userById)

module.exports = router;
