const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');

const Recipe = require('../models/recipe');
const Profile = require('../models/profile');
const User = require('../models/user');

const validateRecipeInput = require('../validation/recipe');







//NEW SYNTAX **********
// @route POST api/recipe
// @route POST a recipe
// @route Private
router.post('/', [ auth, [ check('title', 'title is required').not().isEmpty() ]
], async (req, res) => {
    
  const errors = validationResult(req);
    if(!error.isEmpty()) {
      return res.status(400).json({errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const newRecipe = {
        title: req.body.title,
        username: user.username,
        avatar: user.avatar,
        user: req.user.id,
        ingredients: req.body.ingredients,
      }


   const recipe = await newRecipe.save();
   res.json(recipe)


    }catch(err) {
      console.error(err.message)
      res.status(500).send('Server Error - Post Recipe')
    }
});