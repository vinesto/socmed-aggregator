const routes = require('express').Router()
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const {readAll,readOne,remove,update, getRepos,getSearchRepo,createRepo} = require('../controllers/user')

routes.get('/',readAll)//get all user (admin only)
// routes.post('/',add)//create user (admin only)
// routes.get('/:id',readOne)
// routes.delete('/:id',remove)
// routes.put('/:id',update)
routes.get('/repos',getRepos)
routes.post('/repos',authentication,createRepo)
routes.get('/search-repo/:reponame',authentication,getSearchRepo)


module.exports = routes