const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    const firstUser = new User(req.body)

    firstUser.save().then(() => {
        res.status(201).send(firstUser)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((err) => {
        res.send(err)
    })
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id
    User.findById(id).then((user) => {
        if (!user) {
            return res.status(400).send()
        }
        res.send(user)
    }).catch((err) => {
        res.status(500).send()
    }) 
})

app.post('/tasks', (req, res) => {
    const firstTask = new Task(req.body)

    firstTask.save().then(() => {
        res.status(201).send(firstTask)
    }).catch((err) => {
        res.status(400).send(err)
    })
} )

app.listen(port, () => {
    console.log('Server Initialized!!')
})