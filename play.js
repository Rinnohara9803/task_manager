// require('./src/db/mongoose')
// const Task = require('./src/models/task')
// const User = require('./src/models/user')

// const updateAndCount = async (id, age) => {
//     const findByIdAndUpdate = User.findByIdAndUpdate(id, {age})
//     const count = User.countDocuments({age})
//     return findByIdAndUpdate
// }

// const deleteTaskByIdAndCount = async(id, completed) => {
//     const deletedTask = await Task.findByIdAndDelete(id).then((task) => {
//         if (!task) {
//             throw new Error('No Data Found')
//         }
//         else {
//             return task
//         }
//     })
//     const count = await Task.countDocuments({completed})

//     return deletedTask
    
// }

// deleteTaskByIdAndCount('613231882bce7c4c63cc287d', false).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })
