// /Users/User/mongodb/bin/mongod.exe --dbpath=/Users/User/mongodbdata
const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://localhost:27017/task-manager-api')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Invalid Age')
            }
        }
    },
    
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 6) {
                throw new Error('Your password must be greater than 6')
            }
            else if (value.toLowerCase().includes('password')) {
                throw new Error('Password can\'t contain the word "password"')
            }
        }
    },
})

const Task = mongoose.model('Task', {
    taskDescription: {
        type: String,
        required: true,
        trim: true,
       
    },
    completed: {
        default: false,
        type: Boolean
    }
})

const newTask = new Task(
    {
        taskDescription: 'Watch Anime'
    }
)

newTask.save().then((result) => {
 console.log(result)
}).catch((err) => {
    console.log(err)
})



// const newUser = new User(
//     {
//         name: 'Bhawana',
//         age: 20,
//         email: 'bhawanashahi@gmail.com',
//         password: 'bhawanashahi'
//     }
// )

// newUser.save().then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err)
// })