const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
    {
        taskDescription: {
            type: String,
            required: true,
            trim: true,
           
        },
        completed: {
            default: false,
            type: Boolean
        }, 
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }, {
        timestamps: true
    }
)

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
