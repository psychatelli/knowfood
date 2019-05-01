const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const passport = require('passport');

const Recipe = require('../models/recipe');




// @route GET api/recipe
// @route Get all recipe
// @route Public
router.get('/', (req, res) => {
    Recipe.find()
    .sort( { date: -1} )
    .then(recipes => res.json(recipes))
    .catch(err => res.status(404).json( {nopostfound: 'No recipe found'} ));

})


// @route GET api/recipe/:id
// @route Get one recipe
// @route Public

router.get('/:id', (req,res) => {
    Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(404).json( {nopostfound: 'No recipe found with that id'} ));
})




// @route POST api/recipe
// @route Post a recipe
// @route Public

router.post('/', (req, res) => {
    const newRecipe = new Recipe({
        thumbnail: req.body.thumbnail,
        title: req.body.title,
        ingredients: req.body.ingredients,
        username: req.body.username,
        avatar: req.body.avatar,
    });

    newRecipe.save().then(recipe => res.json(recipe))
    .catch(err => res.status(404).json( {noRecipeFound: 'Could not add recipe'} ));

});

 


// @route DELETE api/recipe/:id
// @route Delete single recipe
// @route private
router.delete('/:id', (req, res) => {
        Recipe.findById(req.params.id)
        .then(recipe => {
            //Delete
            recipe.remove().then(() => res.json({ success: true}));
        })
        .catch(err => res.status(404).json( {RecipeNotFound: 'No recipe found'}));
});




// @route GET api/recipe/step/:id
// @route Get all recipe 
// @route Public

router.post('/step/:id', (req, res) => {

    Recipe.findById(req.params.id)
    .then(recipe => {
        const newStep = {
            thumbnail: req.body.thumbnail,  
            text: req.body.text,
        }

        //Add step to array
        recipe.step.unshift(newStep);

        //save
        recipe.save().then(recipe => res.json(recipe));
    })
    .catch(err => res.status(404).json({ postnotfound: 'No post found'} ));
});



module.exports = router;
