require('./src/db/mongoose')
const User = require('./src/models/user')
const express = require('express')

const app = express()

// const add = (a, b) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(a + b)
//         }, 2000)
//     })
// }

// add(1, 5).then((sum) => {
//     console.log(sum)
//     return add(sum, 4).then((sum2) => {
//         console.log(sum2)
//     })
// }).catch((e) => {
//     console.log(e)
// })

app.get('/usersForPlay', (req, res) => {
    User.find({}).then((user) => {
        res.send(user)
    } ).catch((e) => {
        res.send(e)
    })
})

