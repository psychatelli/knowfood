
const express = require('express');

const router = express.Router();
let User = require('../models/user');



router.get('/', function (req, res) {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json( {nopostfound: 'No posts found'} ));
  })



module.exports = router;