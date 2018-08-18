const Model = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const request = require('request')
const axios = require('axios')


const signUp = (req, res) => {
    let { username, password, email, role } = req.body
    Model.create({
        username: username,
        password: password,
        email: email,
        role: role
    })
        .then(function (data) {
            res.status(201).json({ msg: 'new user added', data: data })
        })
        .catch(function (err) {
            res.status(500).json({ msg: 'add user failed' })
        })
}

const signIn = (req, res) => {
    Model.findOne({
        email: req.body.email
    })
        .then(function (user) {
            if (user) {
                let token = jwt.sign({ username: user.username, role: user.role, email: user.email }, 'secretkey')
                let decodedPass = bcrypt.compare(req.body.password, user.password)
                if (decodedPass) {
                    res.status(201).json({ token })
                } else {
                    res.status(400).json({ msg: "password/username is wrong" })
                }
            } else {
                res.status(400).json({ msg: "username/password not exist" })
            }
        })
}

function loginFB(req, res) {

    let autResponse = req.body
    // console.log('====authresponse=====', autResponse);
    let url_user_info = `https://graph.facebook.com/me?fields=id,name,email&access_token=${autResponse.accessToken}`

    axios.get(url_user_info)
        .then(function (result) {
            // console.log('----resultdataemail-----', result.data.email);
            Model.findOne({
                email: result.data.email
            })
                .then(function (userdb) {
                    // console.log('====userdb====', userdb);
                    if (!userdb) {
                        Model.create({
                            username: result.data.name,
                            email: result.data.email,
                            userID: result.data.id
                        })
                            .then(function (newUser) {
                                let token = jwt.sign({ username: userdb.username, role: userdb.role, email: userdb.email }, 'secretkey')
                                res.json({ newUser, token })
                                // console.log('=======newUser======', newUser);
                            })
                    } else {
                        let token = jwt.sign({ username: userdb.username, role: userdb.role, email: userdb.email }, 'secretkey')
                        // console.log('=====userdb else=====', userdb);
                        res.json({ userdb, token })
                    }
                })
                .catch(function (err) {
                    // console.log('err bro', err);
                })
        })

    // console.log(req.body);
    // var options = {
    //     url: url_user_info,
    //     method: 'POST'
    // };

    // function callback(error, response, body) {
    //     let data = (JSON.parse(body))
    //     Model.findOne({
    //         email:data.email
    //     })
    //     .then(function(user){
    //         if(user){

    //         }

    //     })
    //     // console.log(JSON.parse(body));

    // }

    // request(options, callback);

    // axios.get(url_user_info)
    // .then((result) => {
    //     console.log("----", result.data);
    //     // 1. cek apakah result.data.email ada di database ?
    //     // 2. kalo ada, get userId(db) nya, kemudian generate token dengan JWT
    //     // 3.     
    // })
}

function logOutFB(){


}



module.exports = { signUp, signIn, loginFB }

