const express = require('express');
const cors = require('cors');

const bodyparser = require("body-parser"); 

// const usersController = require('./controllers/users/users.controller');

const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());


app.use(cors({
        origin:['*'],
        methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
}));



// app.use('/', usersController);

module.exports = app;