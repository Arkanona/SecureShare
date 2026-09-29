const User = require('../models/userModel')

exports.displayImages = async (req, res) => {
    try {
        if(!req.user.id){
            return res.status(401).json({message : 'not connected'})
        }
        const changedUser = await User.findByPk(req.user.id)

        return res.status(200).json(changedUser.images);
    } catch (error) {
        return res.status(500).json({message : error.message})
    }
}