const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser'); // will allow me to take requests from the body, such as post requests(e.g.)
const passport = require('passport');
const path = require('path');

const app = express();


//boddyparser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Connect to Mongo
mongoose.connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));







const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on ${port}`))