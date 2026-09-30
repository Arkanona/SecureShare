const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { sequelize } = require('../config/database')



const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = '150d'

//helper : on génère des tokens
const generateToken = (id) =>{
    return jwt.sign({id}, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    })
}

//US2 : Connexion ok
exports.loginHack = async (req, res) =>{
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({message : 'empty field'})
        }
        const query = `SELECT * FROM "Users" WHERE "email" = '${email}' AND "password" = '${password}'`

        const [results] = await sequelize.query(query);
        //find user and select password field
        const user = results[0]
        if(!user){
            return res.status(401).json({message : 'invalid credantials'})
        }
        console.log(user)
       
        const token = generateToken(user.id)

        return res.status(200).json({
            message : 'User login successfully',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        })

    } catch (error) {
        res.status(500).json({message : 'server error during login', error: error.message})
    }
} 