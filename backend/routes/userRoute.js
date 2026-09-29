const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
// const { updateUser } = require('../controllers/userController')
const upload = require('../middlewares/uploadMiddleware')
const { updatedUser } = require('../controllers/uploadController')

// router.patch('/upload', authMiddleware, updateUser)
router.patch('/:id/image', authMiddleware, upload.single('image'), updatedUser)



module.exports = router 