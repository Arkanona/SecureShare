const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const { updateUser } = require('../controllers/userController')
const upload = require('../middlewares/uploadMiddleware')

router.patch('/upload', authMiddleware, updateUser)
router.patch('/:id/image', upload.single('image'), updateUser)



module.exports = router 