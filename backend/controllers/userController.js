const User = require('../models/userModel')

exports.displayImages = async (req, res) => {
  try {
    console.log("REQ USER :", req.user)

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: 'not connected'
      })
    }

    const changedUser = await User.findByPk(req.user.id)

    console.log("USER TROUVE :", changedUser)

    if (!changedUser) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    console.log("IMAGES :", changedUser.images)

    return res.status(200).json(
      changedUser.images || []
    )

  } catch (error) {
    console.error("DISPLAY IMAGES ERROR :", error)

    return res.status(500).json({
      message: error.message
    })
  }
}