const express = require('express')
const {signin,signup,signout} = require('../controller/user')
const router = express.Router()
const validator = require('../validator/user')

router.post("/signup",validator.createSingUpValidation,signup)
router.post("/signin",validator.createSingInValidation,signin)
router.get("/signout",signout)

module.exports = router;
