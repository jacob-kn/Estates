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
  const { email, password, isRealtor, company } = req.body // destruct data

  //only need to email and password to sign in
  if (!email || !password) {
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

  let user

  if (company) {
    user = await Seller.create({
      email,
      password: hashedPassword,
      isRealtor,
      company
    })
  } else {
    user = await Seller.create({
      email,
      password: hashedPassword,
      isRealtor,
      company: 'None'
    })
  }

  if (user) {
    // if user created
    res.status(200).json({
      _id: user.id, // the created id
      email: user.email,
      type: 'seller',
      isRealtor: user.isRealtor,
      company: user.company,
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

  //only need to email and password to sign in
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
      type: 'buyer',
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
      type: 'buyer',
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

  const user = await Seller.findOne({ email }) // find by email
    .populate({
      path: 'comments',
      populate: { path: 'user', select: 'email' }
    })
    .exec()

  //password is hashed need to bcyrpt method called compare
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      // return current with the jwt
      _id: user.id, // the created id
      email: user.email,
      type: 'seller',
      isRealtor: user.isRealtor,
      company: user.company,
      comments: user.comments,
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
  let user = await Buyer.findById(req.user.id)
  if (!user) {
    user = await Seller.findById(req.user.id)
      .populate({
        path: 'comments',
        populate: { path: 'user', select: 'email' }
      })
      .exec()
    res.status(200).json({
      // return current withthe jwt
      _id: user.id, // the created id
      email: user.email,
      type: 'seller',
      isRealtor: user.isRealtor,
      company: user.company,
      comments: user.comments,
      token: generateToken(user._id) //also send token to user
    })
  } else {
    res.status(200).json({
      _id: user.id, // the created id
      email: user.email,
      type: 'buyer',
      token: generateToken(user._id) //also send token to user
    })
  }
}) //end getMe

/**
 * @desc DELETE a user
 * @route DELETE /api/users
 * //need token to access
 * for when a user is already loged in
 * need jwt in the authorization to access
 *
 * error check taken care of by authMiddleware.js
 *
 * @access private
 */
const deleteMe = asyncHandler(async (req, res) => {
  let user = await Buyer.findOneAndDelete({ _id: req.user.id })
  if (!user) {
    user = await Seller.findOneAndDelete({ _id: req.user.id })
  }

  res.status(200).json({
    // return information
    message: 'User Deleted'
  })
}) //end deleteMe

/**
 * @desc update email
 * @route PUT /api/users/email
 * //need token to access
 * for when a user is already loged in
 * need jwt in the authorization to access
 *
 * error check taken care of by authMiddleware.js
 *
 * @access private
 */
const updateEmail = asyncHandler(async (req, res) => {
  const { email } = req.body
  if (!email) {
    res.status(400)
    throw new Error('Please Add New Email')
  }

  //set up fields to update
  const filter = { _id: req.user.id }
  const update = { email }

  if (req.user.isRealtor === undefined) {
    //check to see if email already exisits in the buyer database
    const buyerExists = await Buyer.findOne({ email }) // access database to see if user already exists
    if (buyerExists) {
      res.status(400)
      throw new Error('Buyer Already Exists')
    }
  } else {
    //check to see if email already exisits in the seller database
    const sellerExists = await Seller.findOne({ email }) // access database to see if user already exists
    if (sellerExists) {
      res.status(400)
      throw new Error('Seller Already Exists')
    }
  }

  let user = await Buyer.findByIdAndUpdate(filter, update, {
    new: true
  }) // update the user
  if (!user) {
    user = await Seller.findByIdAndUpdate(filter, update, {
      new: true
    }) // update the user
  }

  res.status(200).json({
    email: user.email // updated email
  })
}) //end updateUsername

/**
 * @desc update password
 * @route PUT /api/users/password
 * //need token to access
 * for when a user is already loged in
 * need jwt in the authorization to access
 *
 * @access private
 */
const updatePassword = asyncHandler(async (req, res) => {
  const { password } = req.body
  if (!password) {
    res.status(400)
    throw new Error('Please Add New Password')
  }

  //hash password using bcyrptjs
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //set up fields to update
  const filter = { _id: req.user.id }
  const update = { password: hashedPassword }

  let user = await Buyer.findByIdAndUpdate(filter, update, {
    new: true
  }) // update the user
  if (!user) {
    user = await Seller.findByIdAndUpdate(filter, update, {
      new: true
    }) // update the user
  }

  res.status(200).json({
    message: 'Password updated'
  })
}) //end updateUsername

/**
 * @desc update company
 * @route PUT /api/users/realtor/company
 * //need token to access
 * for when a user is already loged in
 * need jwt in the authorization to access
 *
 * error check taken care of by authMiddleware.js
 *
 * @access private
 */
const updateCompany = asyncHandler(async (req, res) => {
  if (!req.user.isRealtor) {
    res.status(400) // 400 Bad Request
    throw new Error('Current user is not a realtor')
  }

  const { company } = req.body
  if (!company) {
    res.status(400)
    throw new Error('Please Add New Company')
  }

  //set up fields to update
  const filter = { _id: req.user.id }
  const update = { company }

  let user = await Seller.findByIdAndUpdate(filter, update, {
    new: true
  }) // update the user

  res.status(200).json({
    company: user.company // updated company
  })
}) //end updateCompany

/**
 * @desc add comment
 * @route PUT /api/users/buyer/comment/:rid
 * //need token to access
 * for when a user is already loged in
 * need jwt in the authorization to access
 *
 * error check taken care of by authMiddleware.js
 *
 * @access private
 */
const addComment = asyncHandler(async (req, res) => {
  if (req.user.isRealtor !== undefined) {
    // user must be a buyer to comment
    res.status(400) // 400 Bad Request
    throw new Error('Current user is not a buyer')
  }

  if (!req.params.rid) {
    res.status(400)
    throw new Error('Empty realtor id in parameters')
  }

  const { comment } = req.body
  if (!comment) {
    res.status(400)
    throw new Error('Please add a comment')
  }

  const completeComment = {
    user: req.user.id,
    comment
  }

  //set up fields to update
  const filter = { _id: req.params.rid }
  const update = { $push: { comments: completeComment } }

  const seller = await Seller.findById(filter)
  if (!seller.isRealtor) {
    res.status(400)
    throw new Error('Error: this seller is not a realtor')
  }

  let user = await Seller.findByIdAndUpdate(filter, update, {
    new: true
  })
    .populate({
      path: 'comments',
      populate: { path: 'user', select: 'email' }
    })
    .exec()

  res.status(200).json({
    comments: user.comments // updated comments
  })
}) //end addComment

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
  getMe,
  deleteMe,
  updateEmail,
  updatePassword,
  updateCompany,
  addComment
}
