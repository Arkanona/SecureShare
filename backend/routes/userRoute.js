const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadMiddleware')
const { updatedUser } = require('../controllers/uploadController')
const { displayImages } = require('../controllers/userController')

router.patch('/:id/image', authMiddleware, upload.single('image'), updatedUser)
router.get('/profile', authMiddleware, displayImages)



module.exports = router 