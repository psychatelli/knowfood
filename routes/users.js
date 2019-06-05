
const express = require('express');
const router = express.Router();
let User = require('../models/user');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
 

//@route POST api/users
//@desc Register user
//@access Public

router.post('/', [
  check('username', 'name is required').not().isEmpty(), 
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 4 or more characters').isLength({ min: 4})

], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }


  const { username, email, password } = req.body;

try {


//See if User exists
let user = await User.findOne({ email: email})

if(user) {
  return res.status(400).json({errors: [{ msg: 'User already exists'}] });
}

//Get users gravatar
const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })

user = new User({
  username,
  email,
  avatar,
  password
})


//Encrypt password
const salt = await bcrypt.genSalt(10);

user.password = await bcrypt.hash(password, salt);

await user.save();

// Return jsonwebtoken
const payload = {
  user: {
    id: user._id
  }
}

jwt.sign(payload, global.gConfig.jwtSecret, {expiresIn: 360000 }, (err, token) => {
    if(err) throw err;
    res.json({ token });
// res.json(user._id) if you want to send the user id instead of the token;
})
  

  // res.send('User registered')


}catch(err) {
  console.error(err.message)
  res.status(500).send('Server Error')
}

  
  })



// router.get('/', (req, res) => {
//   console.log(req.body)
//   res.send('user Route')
// })
 






module.exports = router;