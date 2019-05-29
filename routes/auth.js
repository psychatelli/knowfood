
const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');


//@route POST api/auth
//@desc Test
//@access Public
router.get('/', auth, (req, res) => {
    console.log(req.body)
    res.send('Auth Route')
  })
   
module.exports = router;



module.exports = router;