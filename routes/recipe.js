const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');

// const mongoose = require('mongoose');
// const passport = require('passport');

const Recipe = require('../models/recipe');
const Profile = require('../models/profile');
const User = require('../models/user');

const validateRecipeInput = require('../validation/recipe');


// @route GET api/recipe
// @route Get all recipe
// @route Private
              // router.get('/', (req, res) => {
              //     Recipe.find()
              //     .sort( { date: -1} )
              //     .then(recipes => res.json(recipes))
              //     .catch(err => res.status(404).json( {nopostfound: 'No recipe found'} ));
              // })

  router.get('/', auth, async (req, res) => {
    try {
      let Allrecipes = await Recipe.find().sort( { date: -1} );
      res.json(Allrecipes)

    }catch(err) {
      console.error(err.message)
      res.status(500).send('No Recipies Round')
    }
  })




// @route GET api/recipe/:id
// @route Get one recipe
// @route Public

// router.get('/:id', (req,res) => {
//     Recipe.findById(req.params.id)
//     .then(recipe => res.json(recipe))
//     .catch(err => res.status(404).json( {nopostfound: 'No recipe found with that id'} ));
// })
router.get('/:id', auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if(!recipe) {
      return res.status(404).json({ msg: 'Recipe not found'})
    }

    res.json(recipe)

  }catch(err){
    console.error(err.message)
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Recipe not found'})
    }
    res.status(500).send('Recipe not found')

  }
})


 // @route POST api/recipe
// @route Get recipes for specific user
// @route Public
router.get('/user/:userId', async (req, res) => {
  try {
    const recipe = await Recipe.find({user: req.params.userId});
 
    if(!recipe) {
      return res.status(404).json({ msg: 'No recipies created yet:('})
    }

    res.json(recipe)

  }catch(err){
    console.error(err.message)
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Recipe not found'})
    }
    res.status(500).send('Recipe not found')

  }
})


 // @route POST api/recipe
// @route Post a recipe
// @route Public

          // router.post('/', (req, res) => {
              
          //     const newRecipe = new Recipe({
          //         thumbnail: req.body.thumbnail,
          //         title: req.body.title,
          //         ingredients: req.body.ingredients,
          //         username: req.body.username,
          //         avatar: req.body.avatar,
          //     });

          //     newRecipe.save().then(recipe => res.json(recipe))
          //     .catch(err => res.status(404).json( {noRecipeFound: 'Could not add recipe'} ));
          // });


          //MY SIMPLE ASYNC POST
          // router.post('/', async (req, res) => {
          //     try{
          //       const newRecipe = new Recipe({
          //         thumbnail: req.body.thumbnail,
          //         title: req.body.title,
          //         ingredients: req.body.ingredients,
          //         username: req.body.username,
          //         avatar: req.body.avatar,
          //       }); 
              
          //       const recipe = await newRecipe.save()
          //       res.json(recipe)


          //     }catch(err){
          //       console.error(err.message)
          //       res.status(500).send('Could not add recipe')
          //       }  
          //   })


          router.post('/', [ auth, [ check('title', 'title is required').not().isEmpty() ]
          ], async (req, res) => {
              
            const errors = validationResult(req);
              if(!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array() })
              }

              try {
                const user = await User.findById(req.user.id).select('-password');
                    
                const newRecipe = new Recipe({
                  thumbnail: req.body.thumbnail,
                  title: req.body.title,
                  username: user.username,
                  avatar: user.avatar,
                  user: req.user.id,
                  ingredients: req.body.ingredients,
                })


            const recipe = await newRecipe.save();
            res.json(recipe)


              }catch(err) {
                console.error(err.message)
                res.status(500).send('Server Error - Post Recipe')
              }
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

  // router.put('/:id', async (req, res) => {
  //   try{
  //     let recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true});
  //     return res.send(recipe)

  //   }catch(err){
  //     console.error(err.message)
  //     res.status(500).send('Could not update recipe')
  //   }
   
  // })


 

// @route DELETE api/recipe/:id
// @route Delete single recipe
// @route private
          // router.delete('/:id', (req, res) => {
          //         Recipe.findById(req.params.id)
          //         .then(recipe => {
          //             //Delete
          //             recipe.remove().then(() => res.json({ success: true}));
          //         })
          //         .catch(err => res.status(404).json( {RecipeNotFound: 'No recipe found'}));
          // });


router.delete('/:id', auth, async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if(!recipe) {
      return res.status(404).json({ msg: 'Recipe not found'})
    }

    //Check user
    if(recipe.user.toString() !== req.user.id ){
      return res.status(401).json({ msg: 'User not authorized'})
    }
    await recipe.remove();

    res.json({msg: 'Recipe Removed'})


  }catch(err) {
    console.error(err.message)
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Recipe not found'})
    }
    res.status(500).send('No Recipies Round')
  }
})



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
        recipe.step.push(newStep)
        recipe.save().then(recipe => res.json(recipe))
    })
    .catch(err => res.status(404).json( {noRecipeFound: 'Could not add STEP'} ));
});


// router.post('/step/:recipe_id', async (req, res) => {

//   try{

//     let recipe = await Recipe.findById(req.params.recipe_id);
//     let addNewStep = () => {
//     const newStep = {
//       thumbnail: req.body.thumbnail,  
//       text: req.body.text
//     }
//     recipe.step.push(newStep)
//      await recipe.save()
//     res.json(recipe)
//     }
//   }catch(err){
//     console.error(err.message)
//     res.status(500).send('Could not add recipe step')
//     } 

// })


// @route DELETE api/step/recipe/:id
// @route Delete single recipe step
// @route private
router.delete('/step/:recipe_id/:step_id',
  (req, res) => {
    Recipe.findById(req.params.recipe_id)
      .then(recipe => {
        // Check to see if comment exists
        if (
          recipe.step.filter(
            recipe => recipe._id.toString() === req.params.step_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ step: 'Step does not exist' });
        }

        // Get remove index
        const removeIndex = recipe.step
          .map(item => item._id.toString())
          .indexOf(req.params.step_id);

        // Splice comment out of array
        recipe.step.splice(removeIndex, 1);

        recipe.save().then(recipe => res.json(recipe));
      })
      .catch(err => res.status(404).json({ stepfound: 'No step found' }));
  }
);








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

  });





// @route POST api/recipe/comment/:recipe_id
// @route post a step
// @route Public
 

router.post('/comment/:recipe_id', auth, async (req, res) => {
  
    try {
      const post = await Recipe.findById(req.params.recipe_id)

      const newComment = {
        text: req.body.text,
        username: req.body.username,
        avatar: req.body.avatar,
        user: req.user.id
    } 

    //Add to comments array
    post.comments.unshift(newComment);

    //save
    post.save().then(post => res.json(post))

      
    }catch(err) {
      console.error(err.message)
      res.status(500).send('Server Error - Post Recipe')
    }
            

  });




  

// @route   DELETE api/recipe/step/:id/:step_id
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
