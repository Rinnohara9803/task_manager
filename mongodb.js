//CRUD Create Read Update Delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectId

const connectionURL = 'mongodb://localhost:27017'

MongoClient.connect(connectionURL, (error, client) => {
    if (error) {
        return console.log(error)
    }
    const db = client.db('task-manager')

    db.collection('users').deleteOne({
        name: 'Amul'
    }).then((user) => {
        console.log(user)
    }).catch((err) => {
        console.log(err)
    })
})

