
const express = require('express')
const app = express()
const http = require('http').Server(app)
const path = require('path')
const bodyParser = require('body-parser')

const db = require('./db')
const router = require('./router')

//middleware
app.use(express.static(path.join(__dirname, 'client/build')));
//bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//addHeaders

//routes
app.use(router)
//db connects
db.connect()
//start server
http.listen(5000, () => console.log(`Listening on 5000`))