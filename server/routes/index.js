const routes = require('express').Router()
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const routesUser = require('./user')
const {signUp,signIn, loginFB} = require('../controllers/index') 


routes.use('/users',routesUser)
routes.post('/signup', signUp)
routes.post('/signin', signIn)
routes.post('/loginfb',loginFB)


// routes.get('/api/users', authentication, authorization, getUser) //get all user info (admin only)
// routes.get('/api/users/:id', authentication, getUserById) //get single user info (admin and user)
// routes.post('/api/users', authentication, authorization, createUser)//create a user (admin only)
// routes.delete('/api/users/:id', authentication, authorization, deleteUser)//delete user (admin only)
// routes.put('/api/users/:id', authentication, updateUser)//update user info (admin and user)


module.exports = routes