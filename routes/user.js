const express = require('express')

// kontroler funkcije

const {signupUser, loginUser } = require('../kontroleri/userKontroler')

const router = express.Router()

// ulogiravanje route

router.post('/login', loginUser)


// kreiranje route

router.post('/signup', signupUser)

module.exports = router