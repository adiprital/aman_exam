const express = require('express');
const cors = require('cors');
const bodyparser = require("body-parser"); 

const contactsController = require('./controllers/contacts.controller');

const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());


app.use(cors({
        origin:['*'],
        methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
}));

app.use('/', contactsController);

module.exports = app;