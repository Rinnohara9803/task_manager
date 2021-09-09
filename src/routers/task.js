const express = require('express')
const router = new express.Router()


router.post('/tasks', async (req, res) => {
    const firstTask = new Task(req.body)

    try {
        await firstTask.save()
        res.status(201).send(firstTask)
    } catch(e) {
        res.status(400).send()
    }
} )

router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        if (!tasks) {
            return res.status(404).send()
        } 
        res.send(tasks)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', async (req, res) => {
    const id = req.params.id

    try {
        const task = await Task.findById(id).then((task))
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const id = req.params.id

    const updatingFields = Object.keys(req.body)
    const allowedFields = ['taskDescription', 'completed']

    const isValidOperation = updatingFields.every((updateField) => allowedFields.includes(updateField))

    if(!isValidOperation) {
        return res.status(400).send({error: "Invalid Operation"})
    }

    try {
        const task = await Task.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})

        if(!task) {
            return res.status(400).send()
        }

        res.send(task)

    } catch (e) {
        res.send(e)
    }

})

router.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id

    try {
        const deletedTask = await Task.findByIdAndDelete(id)

        if(!deletedTask) {
           return res.status(404).send()
        }

        res.send(deletedTask)

    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router