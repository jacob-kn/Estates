// takes request and response
const jwt = require('jsonwebtoken') // json web token
const bcrypt = require('bcryptjs') // encrypting
const asyncHandler = require('express-async-handler')
const Buyer = require('../models/buyerModel') // import buyer model
const Seller = require('../models/sellerModel') // import seller model

/**
 * @desc register a new seller
 * @route POST /api/users/seller
 * @access public
 */
const registerSeller = asyncHandler(async (req, res) => {
  const { email, password, realtor } = req.body // destruct data

  //only need to username and password to sign in
  if (!username || !password) {
    // these aren't included
    res.status(400) //400 Bad Request
    throw new Error('Please Add All Fields')
  }

  //check to see if email already exisits in the seller database
  const sellerExists = await Seller.findOne({ email }) // access database to see if user already exists
  if (sellerExists) {
    res.status(400)
    throw new Error('Seller Already Exists')
  }

  //hash password using bcyrptjs
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //create users = await
  const user = await Seller.create({
    email,
    password: hashedPassword,
    realtor: realtor
  })

  if (user) {
    // if user created
    res.status(200).json({
      _id: user.id, // the created id
      email: user.email,
      token: generateToken(user._id) //also send token to user
    })
  } else {
    res.status(400)
    throw new Error('Could Not Create User - Invalid Entry')
  }
}) //end registerSeller route

/**
 * @desc register a new buyer
 * @route POST /api/users/buyer
 * @access public
 */
const registerBuyer = asyncHandler(async (req, res) => {
  const { email, password } = req.body // destruct data

  //only need to username and password to sign in
  if (!email || !password) {
    // these aren't included
    res.status(400) //400 Bad Request
    throw new Error('Please Add All Fields')
  }

  //check to see if email already exisits in the buyer database
  const buyerExists = await Buyer.findOne({ email }) // access database to see if user already exists
  if (buyerExists) {
    res.status(400)
    throw new Error('Buyer Already Exists')
  }

  //hash password using bcyrptjs
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //create users = await
  const user = await Buyer.create({
    email,
    password: hashedPassword
  })

  if (user) {
    // if user created
    res.status(200).json({
      _id: user.id, // the created id
      email: user.email,
      token: generateToken(user._id) //also send token to user
    })
  } else {
    res.status(400)
    throw new Error('Could Not Create User - Invalid Entry')
  }
}) //end registerBuyer route

/**
 * @desc login/authenticate a buyer
 * @route POST /api/users/buyer/login
 * @access public
 */
const loginBuyer = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await Buyer.findOne({ email }) /// find by email

  //password is hashed need to bcyrpt method called compare
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      // return current withthe jwt
      _id: user.id, // the created id
      email: user.email,
      token: generateToken(user._id) //also send token to user
    })
  } else {
    res.status(400)
    throw new Error('Invalid Credentials')
  }
}) //end loginBuyer

/**
 * @desc login/authenticate a seller
 * @route POST /api/users/seller/login
 * @access public
 */
const loginSeller = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await Seller.findOne({ email }) /// find by email

  //password is hashed need to bcyrpt method called compare
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      // return current withthe jwt
      _id: user.id, // the created id
      email: user.email,
      token: generateToken(user._id) //also send token to user
    })
  } else {
    res.status(400)
    throw new Error('Invalid Credentials')
  }
}) //end loginSeller

/**
 * @desc get User data
 * @route GET /api/users/me
 * //need token to access
 * for when a user is already loged in
 * need jwt in the authorization to access
 * @access private
 */
const getMe = asyncHandler(async (req, res) => {
  const { _id, email } = await User.findById(req.user.id)

  res.status(200).json({
    // return user
    _id: _id,
    email
  })
}) //end getMe

// /**
//  * @desc DELETE a user
//  * @route DELETE /api/users/id
//  * //need token to access
//  * for when a user is already loged in
//  * need jwt in the authorization to access
//  *
//  * error check taken care of by authMiddleware.js
//  *
//  * @access private
//  */
// const deleteMe  = asyncHandler( async (req, res) => {

//     const deletedUser = await User.findOneAndDelete({ _id: req.user.id }) // delete one user and return info

//     res.status(200).json({ // return information
//         message:'User Deleted',
//         deletedUser
//     });

// }) //end deleteMe

// /**
//  * @desc update username
//  * @route PUT /api/users/username
//  * //need token to access
//  * for when a user is already loged in
//  * need jwt in the authorization to access
//  *
//  * error check taken care of by authMiddleware.js
//  *
//  * @access private
//  */
// const updateUsername  = asyncHandler( async (req, res) => {

//     const {username} = req.body;
//     if(!username){
//         res.status(400);
//         throw new Error("Please Add New Username");
//     }

//     //set up fields to update
//     const filter = { _id: req.user.id };
//     const update = { username: username };

//     const updatedUser = await User.findByIdAndUpdate(filter, update, {new: true} ); // updatew trhe user

//     res.status(200).json({ //retrun object
//         message:'Updated Username',
//         updatedUser

//     });

// }) //end updateUsername

// /**
//  * @desc update password
//  * @route PUT /api/users/password
//  * //need token to access
//  * for when a user is already loged in
//  * need jwt in the authorization to access
//  *
//  * @access private
//  */
// const updatePassword  = asyncHandler( async (req, res) => {

//     const {password} = req.body;
//     if(!password){
//         res.status(400);
//         throw new Error("Please Add New Password");
//     }

//     //hash password using bcyrptjs
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     //set up fields to update
//     const filter = { _id: req.user.id };
//     const update = { password: hashedPassword };

//     const updatedUser = await User.findByIdAndUpdate(filter, update, {new: true} ); //update the users password

//     res.status(200).json({ //retrun object
//         message:'Updated Username',
//         updatedUser
//     });

// }) //end updateUsername

//Generate JWT Function
const generateToken = id => {
  //an id, the enviroment variable secret
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d' // time to expire
  })
} //end function

//exports
module.exports = {
  registerBuyer,
  registerSeller,
  loginBuyer,
  loginSeller,
  getMe
  // deleteMe,
  // updateUsername,
  // updatePassword
}
