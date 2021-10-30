const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ','')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({_id: decoded, 'tokens.token': token})
    
    if(!user) {
        throw new Error('No user found')
    }

    req.token = token
    req.user = user

    next()
}

module.exports = auth