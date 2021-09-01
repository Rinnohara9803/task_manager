//CRUD Create Read Update Delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectId

const connectionURL = 'mongodb://localhost:27017'

MongoClient.connect(connectionURL, (error, client) => {
    if (error) {
        return console.log('Connnection Doomed.')
    }
    const db = client.db('task-manager')

    // db.collection('Users').insertMany([
    //     {
    //         name: 'PP',
    //         age: 20
    //     },
    //     {
    //         name: 'PP',
    //         age: 21
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Error')
    //     }
    //     console.log(result)
    // })

    // db.collection('Users').findOne({name: 'Pagar'}, (error, user) => {
    //     if (error) {
    //         return console.log('Error')
    //     }
    //     console.log(user)
    // })

    // db.collection('tasks').find({completed: false}).toArray((error, task) => {
    //     console.log(task)
    // })
    
    db.collection('tasks').find({_id: ObjectId("612f1d3d03d648179a85cf46")}).toArray((error, task) => {
        console.log(task)
    })

})

