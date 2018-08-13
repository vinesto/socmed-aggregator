const routes = require('express').Router()
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const routesUser = require('./user')
const {signUp,signIn, loginFB} = require('../controllers/index') 


routes.use('/users',routesUser)
routes.post('/signup', signUp)
routes.post('/signin', signIn)
routes.post('/loginfb',loginFB)




module.exports = routes