const { test, describe, before, after } = require('node:test')
const assert = require('node:assert')
require('dotenv').config()

const User = require('../models/userModel')
const { sequelize } = require('../config/database') 
const { register, login } = require('../controllers/authController')
const { displayImages } = require('../controllers/userController')
const { updatedUser } = require('../controllers/uploadController')
const sharp = require('sharp')

const createMockRes = () => {
    const res = {
        statusCode: 200,
        body: null,
        status(code) {
            this.statusCode = code
            return this
        },
        json(data) {
            this.body = data
            return this
        }
    }
    return res
}

describe('Auth test unit', () => {

    let userA, tokenA
    const testEmails = ['test_us_a@example.com', 'test_us_b@example.com', 'test_us_c@example.com']

    // 2. Nettoyage BDD avec Sequelize Op.in
    before(async () => {
        await User.destroy({
            where: {
                email: testEmails
            }
        })
    })

    after(async () => {
        await User.destroy({
            where: {
                email: testEmails
            }
        })
        await sequelize.close() // Ferme la connexion Sequelize à la fin des tests
    })

    test('Register good ', async () => {
        const reqA = {
            body: {
                name: 'Alice Tester',
                email: 'test_us_a@example.com',
                password: 'Password123!'
            }
        }
        const resA = createMockRes()
        await register(reqA, resA)
        assert.strictEqual(resA.statusCode, 201)
        assert.ok(resA.body.token)
        userA = resA.body.user
    })
    
    test('Login good', async () => {
        const req = {
            body: {
                email: 'test_us_a@example.com',
                password: 'Password123!'
            }
        }
        const res = createMockRes()
        await login(req, res)
        assert.strictEqual(res.statusCode, 200)
        assert.ok(res.body.token)
        tokenA = res.body.token
    })

    test('upload image', async () => {
        const dbUser = await User.findOne({ where: { email: 'test_us_a@example.com' } })
        const imageBuffer = await sharp({
            create: {
                width: 100,
                height: 100,
                channels: 3,
                background: {
                    r: 255,
                    g: 0,
                    b: 0
                }
            }
        })
        .jpeg()
        .toBuffer()

        const req = {
            user: { id: dbUser.id },
            params: {
                id: String(dbUser.id)
            },
            body: {
                description: 'test'
            },
            file: {
                originalname: '1712345678-test.jpg',
                buffer: imageBuffer,
                mimetype: 'image/jpeg'
            },
        }
        const res = createMockRes()
        
        await updatedUser(req, res)

        assert.strictEqual(res.statusCode, 201)
        // Vérifie qu'on reçoit bien un objet ou un tableau pour les images
        assert.ok(res.body)
    })

    test('display images', async () => {
        // Récupérer l'utilisateur créé en BDD via Sequelize
        const dbUser = await User.findOne({ where: { email: 'test_us_a@example.com' } })
        
        const req = {
            user: { id: dbUser.id } // Simule le middleware de vérification du Token JWT
        }
        const res = createMockRes()
        
        await displayImages(req, res)

        assert.strictEqual(res.statusCode, 200)
        // Vérifie qu'on reçoit bien un objet ou un tableau pour les images
        assert.ok(res.body)
    })
    
    test('Register duplicate', async () => {
        // Duplicate email check
        const reqB = {
            body: {
                name: 'Alice Tester',
                email: 'test_us_b@example.com',
                password: 'Password123!'
            }
        }
        const resB = createMockRes()
        await register(reqB, resB)
        assert.strictEqual(resB.statusCode, 201)
        assert.ok(resB.body.token)
        userB = resB.body.user

        const resDup = createMockRes()
        await register(reqB, resDup)
        assert.strictEqual(resDup.statusCode, 400)
    })


    test('Register with weak password', async () => {
        // weak password
        const req = {
            body: {
                name: 'Bob Collaborator nul',
                email: 'test_us_c@example.com',
                password: 'Passwordnul'
            }
        }
        const res = createMockRes()
        await register(req, res)
        assert.strictEqual(res.statusCode, 400)
    })



    test('Login wrong password', async () => {
        //wrong password
        const reqB = {
            body: {
                email: 'test_us_b@example.com',
                password: 'Password12345!'
            }
        }
        const resB = createMockRes()
        await login(reqB, resB)
        assert.strictEqual(resB.statusCode, 401)
    })

    test('Login w wrong mail', async () => {
        //wrong mail
        const reqA = {
            body: {
                email: 'test_us_x@example.com',
                password: 'Password123!'
            }
        }
        const resA = createMockRes()
        await login(reqA, resA)
        assert.strictEqual(resA.statusCode, 401)
    })
})