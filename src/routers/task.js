const express = require('express')
const auth = require('../middleware/auth')
const Task = require('../models/task.js')
const router = new express.Router()


router.post('/tasks', auth, async (req, res) => {

    const firstTask = new Task({
        ...req.body,
        author: req.user._id
    })

    try {
        await firstTask.save()
        res.status(201).send(firstTask)
    } catch (e) {
        res.status(400).send()
    }
})

// GET /tasks?completed=false
// GET /tasks?limit=2&skip=2
// GET /tasks?sortBy=createdAt:desc

router.get('/tasks', auth, async (req, res) => {

    try {
        // const tasks = await Task.find({author: req.user._id})

        const match = {}
        const sort = {}
        
        if (req.query.completed) {
            match.completed = req.query.completed === 'true'
        }
        
        if(req.query.sortBy) {
            const parts = req.query.sortBy.split(':')
            sort[parts[0]] = parts[1] === 'asc' ? 1 : -1
        }

        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: sort
            }
        })
        if (!req.user.tasks) {
            return res.status(404).send()
        }
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
        
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {

        const task = await Task.findOne({_id, author: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    const updatingFields = Object.keys(req.body)
    const allowedFields = ['taskDescription', 'completed']

    const isValidOperation = updatingFields.every((updateField) => allowedFields.includes(updateField))

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid Operation" })
    }

    try {
        const task = await Task.findOne({_id: _id, author: req.user._id})

        if (!task) {
            return res.status(400).send()
        }
        
        updatingFields.forEach((update) => {
            console.log(task[update])         
            console.log(req.body[update])
            task[update] = req.body[update]
        })

        await task.save()
        res.send(task)

    } catch (e) {
        
        res.send(e)
    }

})

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const deletedTask = await Task.findOneAndDelete({_id, author: req.user._id})

        if (!deletedTask) {
            return res.status(404).send()
        }

        res.send(deletedTask)

    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router