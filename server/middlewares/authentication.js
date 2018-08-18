const Model = require('../models/user')
const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    let token = req.headers.token
    if (token) {
        let decode = jwt.verify(token, 'secretkey')
        Model
            .findOne({
                _id: decode.id
            })
            .then(user => {
                if (user == null) {
                    res.status(401)
                    res.json({ error: "user not authorized" })
                } else {
                    next()
                }
            })
            .catch(err => {
                res.status(500)
                res.json({ error: 'internal server error' })
            })
        next()
    } else {
        res.status(401).json({ msg: "you must login first" })
    }
}

module.exports = authentication