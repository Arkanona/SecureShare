const sharp = require('sharp')
const path = require('path')
const fs = require('fs/promises')
const User = require('../models/userModel')

exports.updatedUser = async (req, res) => {
    try {

        if(!req.user.id){
            return res.status(401).json({message : 'not connected'})
        }
        
        const { id } = req.params

        if (!req.file) {
            return res.status(400).json({message: 'Image not found'})}

        const {description} = req.body

        const changedUser = await User.findByPk(req.user.id)
        
        // dossier upload
        const uploadFolder = path.join(
            process.cwd(),
            'upload',
            'user'
        )

        await fs.mkdir(uploadFolder, {
            recursive: true
        })

        // Noms des nouvelles images
        const safeId = id.replace(/[^a-zA-Z0-9-_]/g, '')

        const filename = `${safeId}-card.webp`

        const imagePath = path.join(uploadFolder, filename)

        // Création de l'image card
        await sharp(req.file.buffer)
            .rotate()
            .resize({
                width: 800,
                height: 800,
                fit: 'cover'
            })
            .webp({
                quality: 80
            })
            .toFile(imagePath)


        // URL enregistrées en BDD
        const imageUrl = `/upload/user/${filename}`

        const newimage = {
            url: imageUrl,
            description: description
        }
        
        let updatedimages = [...changedUser.images]

        const exists = updatedimages.some(item => item.url === imageUrl);
        if (exists) {
            updatedimages = updatedimages.filter(item => item.url !== imageUrl);
        } else {
            updatedimages.push(newimage);
        }

        changedUser.images = updatedimages

        changedUser.changed('images', true)

        const updatedUser = await changedUser.save()

        res.status(201).json(updatedUser)

    } catch (err) {
        console.error('ERREUR UPLOAD :', err)

        return res.status(500).json({message: 'Error while modifying the image', error: err.message})
    }
}

