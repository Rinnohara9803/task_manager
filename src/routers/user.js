const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/users', async (req, res) => {
    const firstUser = new User(req.body)
    try {
        await firstUser.save()
        res.status(201).send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        if (!users) {
            return res.status(404).send()
        }
        res.send(users)
    }catch(e) {
        res.status(500).send()
    }
    
})

router.get('/users/:id', async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch(e) {
        res.status(500).send()
    }
})

router.patch('/users/:id', async (req, res) => {
    const id = req.params.id

    const updates = Object.keys(req.body)
    const allowedFields = ['name', 'email', 'age', 'password']

    const isValidOperation = updates.every((update) => allowedFields.includes(update))

    if (!isValidOperation) {
        return res.status(400).send() 
    }

    try {
        const user = await User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})

        if(!user) {
           return res.status(404).send()
        }
        res.send(user)
    } catch(e) {
        res.send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    const id = req.params.id

    try {
        const deletedUser = await User.findByIdAndDelete(id)

        if(!deletedUser) {
           return res.status(404).send()
        }

        res.send(deletedUser)

    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router
