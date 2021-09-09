const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const firstUser = new User(req.body)
    try {
        await firstUser.save()
        res.status(201).send()
    } catch (e) {
        res.status(500).send()
    }
})

app.get('/users', async (req, res) => {
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

app.get('/users/:id', async (req, res) => {
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

app.patch('/users/:id', async (req, res) => {
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

app.delete('/users/:id', async (req, res) => {
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

app.post('/tasks', async (req, res) => {
    const firstTask = new Task(req.body)

    try {
        await firstTask.save()
        res.status(201).send(firstTask)
    } catch(e) {
        res.status(400).send()
    }
} )

app.get('/tasks', async (req, res) => {

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

app.get('/tasks/:id', async (req, res) => {
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

app.patch('/tasks/:id', async (req, res) => {
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

app.delete('/tasks/:id', async (req, res) => {
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

app.listen(port, () => {
    console.log('Server Initialized!!')
})