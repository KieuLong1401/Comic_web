const apiRouter = require('./api.router')

module.exports = (app) => {
    app.use('/', apiRouter)
}
