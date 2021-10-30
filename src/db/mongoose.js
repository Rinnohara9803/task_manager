// /Users/User/mongodb/bin/mongod.exe --dbpath=/Users/User/mongodbdata
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)