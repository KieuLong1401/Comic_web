const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) return next()

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) return next()
        req.user = user
        next()
    })
}