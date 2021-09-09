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



app.listen(port, () => {
    console.log('Server Initialized!!')
})