const User = require('../models/userModel')

exports.updateDescription = async (req, res) => {
  try {
    const { description } = req.body

    const user = await User.findByPk(req.user.id)

    if (!user) {
      return res.status(404).json({
        message: 'Utilisateur introuvable'
      })
    }

    const images = [...(user.images || [])]

    if (images.length === 0) {
      return res.status(404).json({
        message: 'Aucune image trouvée'
      })
    }

    // Dernière image
    const lastIndex = images.length - 1

    images[lastIndex] = {
      ...images[lastIndex],
      description: description
    }

    // Réassignation nécessaire notamment si images est du JSON/JSONB
    user.images = images

    await user.save()

    return res.status(200).json({
      message: 'Description de l’image mise à jour',
      user
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}