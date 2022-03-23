const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Get all users
router.get('/', async (req, res) => {
    const users = await prisma.nm_users.findMany({})

    if (users) {
        res.status(200).send({
            status: 200,
            success: true,
            result: users
        })
    } else {
        res.status(400).send({
            status: 400,
            success: false,
            result: 'There was an error.'
        }) 
    }
})

// Get user with specified id
router.get('/:id', async (req, res) => {
    const { id } = req.params

    const user = await prisma.nm_users.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (user) {
        res.status(200).send({
            status: 200,
            success: true,
            result: user
        })
    } else {
        res.status(400).send({
            status: 400,
            success: false,
            result: 'User not found.'
        })
    }
})

// Get user with specified email
router.get('/email/:email', async (req, res) => {
    const { email } = req.params

    const user = await prisma.nm_users.findMany({
        where: {
            email
        }
    })

    if (user.length === 0) {
        res.status(400).send({
            status: 400,
            success: false,
            result: 'User not found.'
        })
    } else {
        res.status(200).send({
            status: 200,
            success: true,
            result: user
        })
    }
})

// Add user
router.post('/add', async (req, res) => {
    const {
        firstname,
        lastname,
        email,
        password
    } = req.body

    if (firstname !== '' && lastname !== '' && email !== '' && password !== '') {
        const salt = await bcrypt.genSalt(10)
        let pw = await bcrypt.hash(password, salt)

        const duplicate = await prisma.nm_users.findUnique({
            where: {
                email
            }
        })

        if (duplicate) {
            res.status(400).send({
                status: 400,
                success: false,
                result: 'This email address is already in use.'
            })
        } else {
            const user = await prisma.nm_users.create({
                data: {
                    firstname,
                    lastname,
                    email,
                    password: pw
                }
            })
    
            if(typeof user.id !== 'undefined') {
                res.status(200).send({
                    status: 200,
                    success: true,
                    result: 'The user has been added.'
                })
            } else {
                res.status(400).send({
                    status: 400,
                    success: false,
                    result: 'There was an error.'
                })
            }
        }
    } else {
        res.status(400).send({
            status: 400,
            success: false,
            result: 'All fields are required.'
        })
    }
})

// Edit user
router.put('/edit/:id', async (req, res) => {
    const { id } = req.params
    const {
        firstname,
        lastname,
        email
    } = req.body

    const userExist = await prisma.nm_users.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (userExist) {
        if (firstname !== '' && lastname !== '' && email !== '') {
            const user = await prisma.nm_users.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    firstname,
                    lastname,
                    email
                }
            })
    
            if (typeof user.id !== 'undefined') {
                res.status(200).send({
                    status: 200,
                    success: true,
                    result: 'Changes have been saved.'
                })
            } else {
                res.status(400).send({
                    status: 400,
                    success: false,
                    result: 'There was an error.'
                })
            }
        } else {
            res.status(400).send({
                status: 400,
                success: false,
                result: 'All fields are required.'
            })
        }
    } else {
        res.status(400).send({
            status: 400,
            success: false,
            result: 'User not found.'
        })
    }
})

// Change password
router.put('/change-password/:id', async (req, res) => {
    const { id } = req.params

    const userExist = await prisma.nm_users.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (userExist) {
        const { password } = req.body

        if (password !== '') {
            const salt = await bcrypt.genSalt(10)
            let pw = await bcrypt.hash(password, salt)

            const user = await prisma.nm_users.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    password: pw
                }
            })

            if (user) {
                res.status(200).send({
                    status: 200,
                    success: true,
                    result: 'The password has been changed successfully.'
                })
            } else {
                res.status(400).send({
                    status: 400,
                    success: false,
                    result: 'There was an error.'
                })
            }
        } else {
            res.status(400).send({
                status: 400,
                success: false,
                result: 'User not found.'
            })
        }
    } else {
        res.status(400).send({
            status: 400,
            success: false,
            result: 'User not found.'
        })
    }
})

// Delete user
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params

    const userExist = await prisma.nm_users.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if (userExist) {
        const user = await prisma.nm_users.delete({
            where: {
                id: parseInt(id)
            }
        })

        if (user) {
            res.status(200).send({
                status: 200,
                success: true,
                result: 'The user has been successfully deleted.'
            })
        } else {
            res.status(400).send({
                status: 400,
                success: false,
                result: 'There was an error.'
            })
        }
    } else {
        res.status(400).send({
            status: 400,
            success: false,
            result: 'User not found.'
        })
    }
})

module.exports = router