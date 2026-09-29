const { Sequelize } = require('../config/database')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs/promises')
const Upload = require('../models/uploadModel')


exports.updateParkImage = async (req, res) => {
    try {

        const { id } = req.params

        if (!req.file) {
            return res.status(400).json({message: 'Image not found'})}

        // On récupère le parc
        const result = await Upload.selectAttraction(id)

        if (result.rowCount === 0) {
            return res.status(404).json({message: 'Park not found'})
        }

        // const park = result.rows[0]

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

        const timestamp = Date.now()

        const cardFilename = `${safeId}-${timestamp}-card.webp`
        const backgroundFilename = `${safeId}-${timestamp}-background.webp`

        const cardPath = path.join(uploadFolder, cardFilename)
        const backgroundPath = path.join(uploadFolder, backgroundFilename)

        // Création de l'image card
        await sharp(req.file.buffer)
            .rotate()
            .resize({
                width: 600,
                height: 400,
                fit: 'cover'
            })
            .webp({
                quality: 85
            })
            .toFile(cardPath)

        // Création de l'image background
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
            .toFile(backgroundPath)

        // URL enregistrées en BDD
        const cardImageUrl = `/upload/user/${cardFilename}`

        // mise à jour BDD
        const updatePark = await Upload.updateParkDb(cardImageUrl, backgroundImageUrl, id)

        // 8. Suppression des anciennes images
        const oldImages = [
            user.images
        ]

        for (const oldImage of oldImages) {

            if (!oldImage) continue

            const oldImagePath = path.join(
                process.cwd(),
                oldImage.replace(/^\/+/, '')
            )

            try {
                await fs.unlink(oldImagePath)
            } catch (err) {

                if (err.code !== 'ENOENT') {
                    throw err
                }
            }
        }

        return res.status(200).json({message: 'Park image updated', park: updatePark})

    } catch (err) {
        console.error('ERREUR UPLOAD :', err)

        return res.status(500).json({message: 'Error while modifying the image', error: err.message})
    }
}