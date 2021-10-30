const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const {sendWelcomeEmail, sendDeletionEmail} = require('../emails/account')

const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})

router.post('/users', async (req, res) => {
    const firstUser = new User(req.body)
    try {
        await firstUser.save()
        sendWelcomeEmail(firstUser.email, firstUser.name)
        const token = await firstUser.getAuthToken()
        
        res.status(201).send({firstUser, token})
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.getAuthToken()
        res.send({user, token})
    }
    catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send()
    }
    catch(e) {
        res.status(500).send()
    }
})

router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []

        await req.user.save()

        res.send('Log out all success!')
    }
    catch(e) {
        res.status(500).send()
    }
})

router.get('/users/me',auth,  async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedFields = ['name', 'email', 'age', 'password']

    const isValidOperation = updates.every((update) => allowedFields.includes(update))

    if (!isValidOperation) {
        return res.status(400).send() 
    }

    try {

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        res.send(req.user)
    } catch(e) {
        res.send(e)
    }
})

router.delete('/users/me', auth,  async (req, res) => {
    try {
        await req.user.remove()
        sendDeletionEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch(e) {
        console.log(e)
        res.status(500).send()
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {

    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.status(200).send()
}, (error, req, res, next) => {
    res.status(200).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()

    console.log(req.user.avatar)

    res.status(200).send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

    if(!user || !user.avatar) {
        throw new Error()
    }
    res.set('Content-Type', 'image/png')
    res.send(user.avatar)
    }
    catch(e) {
        res.status(500).send()
    }
})

module.exports = router

