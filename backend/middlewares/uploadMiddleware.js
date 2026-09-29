const multer = require('multer')

const storage = multer.memoryStorage()

const upload = multer({
    storage,
    // Limitation à 5 Mo max
    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/webp'
        ]

        if(!allowedTypes.includes(file.mimetype)) {
            return cb(
                new Error('Unsupported format. Use JPG, PNG, or WebP.')
            )
        }

        cb(null, true)
    }
})
module.exports = upload