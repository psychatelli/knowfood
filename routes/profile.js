
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../models/profile');
const User = require('../models/user');

// @route   DELETE api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'});
        }


    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});



// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', async (req, res) => {
    try{
        const users = await User.find({}, 'username avatar')
        
        if(!users){
            return res.status(400).json({msg: 'There is no profile for this user'});
        }
        res.json(users)

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// @route   GET api/profile/:id
// @desc    Get one profiles
// @access  Public

router.get('/:id', async (req, res) => {
    console.log(`Your user ${User}`)

    try{
        const user = await User.findOne({_id: req.params.id}).select("-password")   
        if(!user){
            return res.status(400).json({msg: 'There is no profile for this user'});
        }
        res.json(user)

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }

});







module.exports = router