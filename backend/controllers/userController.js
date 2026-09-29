const User = require('../models/userModel')

exports.updateUser = async (req, res) => {
    try {
        if(!req.user.id){
            return res.status(401).json({message : 'not connected'})
        }

        const {url, description} = req.body

        const newimage = {
            url: url,
            description: description
        }

        const changedUser = await User.findByPk(req.user.id)

        let updatedimages = [...changedUser.images]

        const exists = updatedimages.some(item => item.url === url);
        if (exists) {
            updatedimages = updatedimages.filter(item => item.url !== url);
        } else {
            updatedimages.push(newimage);
        }

        changedUser.images = updatedimages

        const updatedUser = await changedUser.save()

        res.status(201).json(updatedUser)
    } catch (error) {
        return res.status(400).json({message : error.message})
    }
}