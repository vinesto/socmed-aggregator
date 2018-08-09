const Model = require('../models/user')
const request = require('request')
// const axios = require('axios')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')


    

function readAll(req, res) {
    Model.find({})
        .then(function (data) {
            res.status(200).json({ msg: 'data found', data: data })
        })
        .catch(function (err) {
            res.status(500).json({ msg: err.message })
        })
}

function readOne(req, res) {
    Model.findOne({ _id: req.params.id })
        .then(function (data) {
            res.status(200).json({ msg: 'data found', data: data })
        })
        .catch(function (err) {
            res.status(500).json({ msg: err.message })
        })
}

function remove(req, res) {
    Model.remove({ _id: req.params.id })
        .then(function (data) {
            res.status(201).json({ msg: 'delete user success' })
        })
        .catch(function (err) {
            res.status(500).json({ msg: 'delete user failed' })
        })
}

function update(req, res) {
    let { username, password, email } = req.body
    Model.findOneAndUpdate(
        {
            _id: req.params.id
        },
        {
            username: username,
            password: password
        },
        {
            upsert: true,
            setDefaultsOnInsert: true,
        })
        .then(function (data) {
            res.status(201).json({ msg: 'Edit user success', data: data })
        })
        .catch(function (err) {
            res.status(500).json({ msg: 'Edit user failed' })
        })
}


function getRepos(req, res) {
    var options = {
        url: `https://api.github.com/user/repos?access_token=4124174bb8871b273d3cfefd5bec55eb0a06ab40`,
        headers: {
            'User-Agent': 'testing'
        },
        'Accept': 'application/vnd.github.nightshade-preview+json',
        // method: 'GET'
    };

    function callback(error, response, body) {
        // console.log(JSON.parse(body));
        res.status(200).json({
            msg: 'data found',
            data: JSON.parse(body)
        })

    }

    request(options, callback);
}

function getSearchRepo(req, res) {
    let reponame = req.params.reponame
    var options = {
        url: `https://api.github.com/search/repositories?q=${reponame}`,
        headers: {
            'User-Agent': 'testing'
        },
        'Accept': 'application/vnd.github.mercy-preview+json',
        method: "GET"
    };

    function callback(error, response, body) {
        // console.log(JSON.parse(body));
        res.status(200).json({
            msg: 'data found',
            data: JSON.parse(body)
        })

    }

    request(options, callback);
}

function createRepo(req, res) {
    console.log(req.body);
    var options = {
        url: 'https://api.github.com/user/repos?access_token=4124174bb8871b273d3cfefd5bec55eb0a06ab40',
        headers: {
            'User-Agent': 'testing',
            'Content-type': 'application/json'
            // 'Accept': 'application/vnd.github.nightshade-preview+json',
        },
        json: { name: req.body.name },
        method: 'POST'
    };

    function callback(error, response, body) {
        if (!error) {
            res.status(200).json({
                msg: 'create success',
                // data: JSON.parse(body)
            })
        } else {
            res.status(500).json({
                msg: 'create failed'
            })
        }

    }

    request(options, callback);
}

module.exports = { readAll, readOne, remove, update, getRepos, getSearchRepo, createRepo }