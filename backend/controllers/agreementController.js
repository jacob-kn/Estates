const asyncHandler = require('express-async-handler')
const Agreement = require('../models/agreementModel')
const valid = require('../middleware/validateID')

/**
 * @desc create a new agreement
 * @route POST /api/agreements/
 * @access private
 */
const createAgreement = asyncHandler(async (req, res) => {
  const buyer = req.user.id
  if (!buyer) {
    res.status(400)
    throw new Error('Please Add All Fields')
  }

  const agreement = await Agreement.create({ ...req.body, buyer })

  if (agreement) {
    res.status(200).json(agreement)
  } else {
    res.status(400)
    throw new Error('Could not create agreement - Invalid Entry')
  }
})

/**
 * @desc get an agreement
 * @route GET /api/agreements/agreement/:id
 * @access private
 */
const getAgreement = asyncHandler(async (req, res) => {
  const user = req.user.id
  if (!user) {
    res.status(400)
    throw new Error('Please Add All Fields')
  }

  const agreement = await Agreement.findById(req.params.id)
    .populate('seller', 'email')
    .populate('buyer', 'email')
    .populate('property')
    .exec()

  if (
    user !== String(agreement.seller._id) &&
    user !== String(agreement.buyer._id)
  ) {
    res.status(400)
    throw new Error('You do not have permission to view this agreement')
  }

  res.status(200).json(agreement)
})

/**
 * @desc accept agreement
 * @route PUT /api/agreements/accept/:id
 * //need token to access
 * for when a user is already logged in
 * need jwt in the authorization to access
 * @access private
 */
const acceptAgreement = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400)
    throw new Error('Agreement ID could not be found in request parameters')
  }
  if (!valid.isValidObjectId(req.params.id)) {
    res.status(400)
    throw new Error('Invalid agreement id')
  }

  const { sellerName } = req.body
  if (!sellerName) {
    res.status(400)
    throw new Error('Please enter a name')
  }
  const dateSigned = new Date()

  const update = { sellerName, dateSigned }

  await Agreement.findByIdAndUpdate(req.params.id, update)

  const agreement = await Agreement.findById(req.params.id)
    .populate('seller', 'email')
    .populate('buyer', 'email')
    .populate('property')
    .exec()

  const user = req.user.id
  if (user !== String(agreement.seller._id)) {
    res.status(400)
    throw new Error('You do not have permission to sign this agreement')
  }

  res.status(200).json(agreement)
})

/**
 * @desc reject agreement
 * @route PUT /api/agreements/reject/:id
 * //need token to access
 * for when a user is already logged in
 * need jwt in the authorization to access
 * @access private
 */
const rejectAgreement = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400)
    throw new Error('Agreement ID could not be found in request parameters')
  }
  if (!valid.isValidObjectId(req.params.id)) {
    res.status(400)
    throw new Error('Invalid agreement id')
  }

  const { sellerName } = req.body
  if (!sellerName) {
    res.status(400)
    throw new Error('Please enter a name')
  }
  const dateSigned = new Date()
  const rejected = new Date()

  const update = { sellerName, dateSigned, rejected }

  await Agreement.findByIdAndUpdate(req.params.id, update)

  const agreement = await Agreement.findById(req.params.id)
    .populate('seller', 'email')
    .populate('buyer', 'email')
    .populate('property')
    .exec()

  const user = req.user.id
  if (user !== String(agreement.seller._id)) {
    res.status(400)
    throw new Error('You do not have permission to reject this agreement')
  }

  res.status(200).json(agreement)
})

/**
 * @desc get user's agreements
 * @route GET /api/agreements/user
 * //need token to access
 * for when a user is already logged in
 * need jwt in the authorization to access
 * @access private
 */
const getUserAgreements = asyncHandler(async (req, res) => {
  const user = req.user

  let userAgreements
  if (user.isRealtor === undefined) {
    // buyer
    userAgreements = await Agreement.find({ buyer: user.id })
      .populate('seller', 'email')
      .populate('buyer', 'email')
      .populate('property')
      .exec()
  } else {
    // seller
    userAgreements = await Agreement.find({ seller: user.id })
      .populate('seller', 'email')
      .populate('buyer', 'email')
      .populate('property')
      .exec()
  }

  res.status(200).json(userAgreements)
})

// exports
module.exports = {
  createAgreement,
  getAgreement,
  acceptAgreement,
  rejectAgreement,
  getUserAgreements
}
