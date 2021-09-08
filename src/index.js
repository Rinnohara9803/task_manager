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

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

app.get('/tasks/:id', (req, res) => {
    const id = req.params.id
    Task.findById(id).then((task) => {
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch((err) => {
        res.send(err)
    })
})

app.get('/usersforplay', (req, res) => {
    User.findByIdAndUpdate('6132303833b76d2f41d78d9d', {name: 'Babachi'}).then((user) => {
        console.log(user)
        return User.countDocuments({age: 21})
    }).then((user) => {
        console.log(user)
    }).catch((e) => {
        console.log(e)
    })
})

app.get('/tasksforplay', (req, res) => {
    Task.findOneAndRemove({taskDescription: 'Fuck up'}).then((task) => {
        console.log(task)
        return Task.countDocuments({completed: false})
    }).then((tasks) => {
        console.log(tasks)
    }).catch((e) => {
        console.log(e)
    })
})

app.listen(port, () => {
    console.log('Server Initialized!!')
})