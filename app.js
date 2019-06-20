// https://codeburst.io/node-js-best-practices-smarter-ways-to-manage-config-files-and-variables-893eef56cbef

const express = require('express');
const mongoose = require('mongoose')
const config = require('./config/config');
const users = require('./routes/users');
const recipes = require('./routes/recipe');
const auth = require('./routes/auth');
const profile = require('./routes/profile');


mongoose.connect(global.gConfig.database, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false } );

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


app.use(express.json({extended: false}));

 
//Home Route
app.get('/api', (req, res) => {
    res.send('Hello World!')
 });



app.use('/api/users', users);
app.use('/api/recipe', recipes);
app.use('/api/auth', auth);
app.use('/api/profile', profile);

// config variables
app.listen(global.gConfig.node_port, () => {
    console.log(`${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`);
});

