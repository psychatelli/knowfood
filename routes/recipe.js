const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const passport = require('passport');

const Recipe = require('../models/recipe');

const validateRecipeInput = require('../validation/recipe');



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







// @route   POST api/recipe/:id
// @desc    Update Recipe
// @access  Private
router.put('/:id',  (req, res) => {
 
  Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, recipe) => {
    if (err) return res.status(500).send(err);
    return res.send(recipe);
    
    }
)

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




// @route POST api/recipe/step/:recipe_id
// @route post a step
// @route Public

router.post('/step/:recipe_id', (req, res) => {

    Recipe.findById(req.params.recipe_id)
    .then(recipe => {
        const newStep = {
            thumbnail: req.body.thumbnail,  
            text: req.body.text
        }

        //Add step to array
        recipe.step.unshift(newStep)
        recipe.save().then(recipe => res.json(recipe.step))
    })
    .catch(err => res.status(404).json( {noRecipeFound: 'Could not add STEP'} ));
});









// @route   PUT api/recipe/:recipe_id/:step_id
// @desc    Update Recipe Step
// @access  Private
router.put('/step/:recipe_id/:step_id',  (req, res) => {
  var query = { title: 'Mole' };
  var recipe_id = req.params.recipe_id;
  var step_id = req.params.step_id;

const newFields = {};
if(req.body.thumbnail) newFields.thumbnail = req.body.thumbnail;
if(req.body.text) newFields.text = req.body.text;


Recipe.findOneAndUpdate(
    { _id : recipe_id, "step._id" : step_id }, 
    { "step.$.text" : req.body.text, "step.$.thumbnail" : req.body.thumbnail },
    // {'$set': req.body }, 
    {new: true}, 
    (err, recipe) => {
    if (err) return res.status(500).send(err);
    return res.send(recipe);
    }
  )

  // Recipe.findOneAndUpdate(
  //   { _id : recipe_id, "step._id" : step_id }, 
  //   { $set: newFields },
  //   {new: true}, 
  //   (err, recipe) => {
  //   if (err) return res.status(500).send(err);
  //   return res.send(recipe);
  //   }
  // )


 
  

 
  
  

  });




// @route   DELETE api/recipe/step/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete('/step/:recipe_id/:step_id',(req, res) => {
      Recipe.findById(req.params.recipe_id)

        .then(recipe => {
          // Check to see if comment exists

          if (
            recipe.step.filter(
              step => step._id.toString() === req.params.step_id
            ).length === 0
          ) {
            return res
              .status(404)
              .json({ Stepnotexists: 'Step does not exist' });
          }
  
          // Get remove index
          const removeIndex = recipe.step
            .map(item => item._id.toString())
            .indexOf(req.params.step_id);
  
          // Splice comment out of array
          recipe.step.splice(removeIndex, 1);
  
          recipe.save().then(recipe => res.json(recipe));
        })
        .catch(err => res.status(404).json({ stepnotfound: 'No post found' }));
    }
  );



    



module.exports = router;
