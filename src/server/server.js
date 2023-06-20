const productsRouter = require('../routes/products')
const ordersRouter = require('../routes/orders')
const usersRouter = require('../routes/users')
const preferencesRouter = require('../routes/preferences')
const contactRouter = require('../routes/contact')

function apiRouter(app){
    app.use('/api/v1/products', productsRouter)
    app.use('/api/v1/orders', ordersRouter)
    app.use('/api/v1/users', usersRouter)
    app.use('/api/v1/preferences', preferencesRouter)
    app.use('/api/v1/contact', contactRouter)
}

module.exports = {apiRouter}