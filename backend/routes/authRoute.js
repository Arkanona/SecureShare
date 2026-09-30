const express = require('express')
const router = express.Router()
const {register, login} = require('../controllers/authController')
const { loginHack } = require('../controllers/hackController')

router.post('/register', register)
router.post('/login', login)
router.post('/loginhack', loginHack)


module.exports = router 