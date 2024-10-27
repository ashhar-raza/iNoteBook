const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const { body , validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = 'A$adraza@2008'
const fetchuser = require('../middleware/fetchuser');



// Router 1 : Creating a new user by a POST call at /api/auth/createuser No Login required
router.post('/createuser' ,
    [ body('name' , 'Enter a valid name').isLength({min : 3}),
    body('email','Enter a valid email').isEmail(),
    body('password').isLength({min : 8})],
     async (req,res)=>
{   
  let success = false;
  const errors = validationResult(req);
  if(!errors.isEmpty())
  {
    return res.status(400).json({success : success , errors : errors.array()});
  }
  //Single Email Check Error  rasie If founnd
  try {
    let user = await User.findOne({email : req.body.email});
    if(user)
    {
      return res.status(400).json({success : success , errors : `The User with email ${req.body.email} already exists`});
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);

    //Creating a new user
     user = await User.create({
      name : req.body.name,
      email : req.body.email,
      password : secPass
     })
     const data = {
      user : {
         id : user.id
      }
     }
     const authToken = jwt.sign(data , jwtSecret);
     success = true;
    res.json({ success : success ,authToken : authToken});
  } catch (error) {
    console.log(error);
    req.status(500).send({success : success , error : "Some error occured"});
  }
})

// Router 2 : Authenticating the user with the POST /login No login required

router.post ('/login' , [
  body('email' , "Invalid Email" ).isEmail(),
  body('password' , "Pasword cannot be empty").notEmpty()],
async (req,res) => 
{
  let success = false;
  const errors = validationResult(req);
  if(!errors.isEmpty())
  {
    return res.status(400).json({success : success , errors : errors.array()});
  }

  let {email , password} = req.body;
  try {
    
    let user = await User.findOne({email});
    if(!user)
    {
      return res.status(400).json({success : success , error:"Invalid email id"});
    }

    const PasswordCompare = await bcrypt.compare(password , user.password);
    if(!PasswordCompare)
    {
      return res.status(400).json({success : success , error:"Invalid password"});
    }

    const data = {
      user : {
        id:user.id
      }
    };
    const authToken = jwt.sign(data , jwtSecret);
    success = true;
    res.json({success : success , authToken : authToken});


  } catch (error) {
    console.log(error);
    res.status(500).send({success : success , error :"Internal server error occured"});
  }
})


//Router 3 :  Get the user details with POST /getuser Login Required
router.post('/getuser', fetchuser, async (req, res) => {
  try {

    let success = false;
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ success : success , error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({success : success , error :'Internal server error occurred'});
  }
});


module.exports = router