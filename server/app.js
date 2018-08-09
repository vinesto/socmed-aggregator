const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes/index')
const db = mongoose.connection;
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/socmed-user', { useNewUrlParser: true });

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("mongodb connected");
});

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', routes)

app.listen(3000, function (req, res) {
    console.log("listen on port 3000");
})
