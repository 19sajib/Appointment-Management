const express = require('express')

const { signInUser, signUpUser } = require('../Controllers/AuthController')

const router = express.Router()

router.post('/signup', signUpUser)
router.post('/signin', signInUser)

module.exports = router