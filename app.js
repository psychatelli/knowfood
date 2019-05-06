// https://codeburst.io/node-js-best-practices-smarter-ways-to-manage-config-files-and-variables-893eef56cbef

const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser'); // will allow me to take requests from the body, such as post requests(e.g.)
const passport = require('passport');
const path = require('path');
const config = require('./config/config');

const users = require('./routes/user');
const recipes = require('./routes/recipe');


mongoose.connect(global.gConfig.database, { useNewUrlParser: true });

// mongoose.connect(global.gConfig.database);
let db = mongoose.connection;

//Check connection
db.once('open', () =>{
    console.log('Connected to mongo db')
})

// Check for DB errors
db.on('error', function(err){
    console.log(err);
  });


const app = express();

//boddyparser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

 
//Home Route
app.get('/api', (req, res) => {
    res.send('Hello World!')
 });



app.use('/api/users', users);
app.use('/api/recipe', recipes);


// config variables
app.listen(global.gConfig.node_port, () => {
    console.log(`${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`);
});

