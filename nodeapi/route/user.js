const express = require('express')
const {singup,singin} = require('../controller/user')
const router = express.Router()
const validator = require('../validator/user')

router.post("/singup",validator.createSingUpValidation,singup)
router.post('/singin',validator.createSingInValidation,singin)


module.exports = router;
