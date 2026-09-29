const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const { updateUser } = require('../controllers/userController')

router.patch('/upload', authMiddleware, updateUser)



module.exports = router 