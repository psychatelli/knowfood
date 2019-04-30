const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Post model
const Recipe = require('../models/recipe');

//Profile model
const Profile = require('../models/profile');



// @route GET api/recipe
// @route Get all recipe
// @route Public
router.get('/', (req, res) => {
    Recipe.find()
    .then(recipes => res.json(recipes))
    .catch(err => res.status(404).json( {nopostfound: 'No recipe found'} ));

})


// @route GET api/recipe
// @route Get one recipe
// @route Public
router.get('/:id', (req,res) => {
    const user = request.params.user 
    const recipeID = request.params.id 

    Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(404).json( {nopostfound: 'No post found with that id'} ));
})


// @route GET api/recipe/id
// @route Get all recipe 
// @route Public
router.post('/step', (req,res) => {
   
    Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(404).json( {nopostfound: 'No post found with that id'} ));
})



module.exports = router
