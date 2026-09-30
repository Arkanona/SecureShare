const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadMiddleware')
const { updatedUser } = require('../controllers/uploadController')
const { displayImages } = require('../controllers/userController')
const { updateDescription } = require('../controllers/xssController')

router.patch('/:id/image', authMiddleware, upload.single('image'), updatedUser)
router.get('/profile', authMiddleware, displayImages)
router.patch('/description', authMiddleware, updateDescription)


module.exports = router 