const asyncHandler = require('express-async-handler')
const Buyer = require('../models/buyerModel') // import buyer model
const Seller = require('../models/sellerModel') // import seller model
const Property = require('../models/propertyModel') // import property model
const Criteria = require('../models/criteriaModel') // import criteria model
const valid = require('../middleware/validateID')

// --- Helper functions for code reuse ---

/**
 * Gets the buyer's saved properties and returns the array in a response
 */
const returnSavedProperties = asyncHandler(async (req, res) => {
  const user = await Buyer.findById(req.user.id)
    .populate({
      path: 'savedProperties',
      populate: [
        { path: 'seller', select: '_id email isRealtor company' },
        { path: 'criteria' }
      ]
    })
    .exec()

  if (!user) {
    res.status(400)
    throw new Error('Buyer not found')
  }

  if (!user.populated('savedProperties')) {
    res.status(400)
    throw new Error('Could not populate saved posts')
  }
  res.status(200).json(user.savedPosts)
})

/**
 * Gets the seller's listings and returns the array in a response
 */
const returnListings = asyncHandler(async (req, res) => {
  const user = await Seller.findById(req.user.id)
    .populate({
      path: 'listings',
      populate: [
        { path: 'seller', select: '_id email isRealtor company' },
        { path: 'criteria' }
      ]
    })
    .exec()

  if (!user) {
    res.status(400)
    throw new Error('Seller not found')
  }

  if (!user.populated('listings')) {
    res.status(400)
    throw new Error('Could not populate saved posts')
  }
  res.status(200).json(user.listings)
})

// ---

// --- Saved Property Controllers ---

/**
 * @desc get buyer's saved properties
 * @route GET /api/users/buyer/saved-properties
 * //need token to access
 * for when a user is already logged in
 * need jwt in the authorization to access
 * @access private
 */
const getSavedProperties = asyncHandler(async (req, res) => {
  returnSavedProperties(req, res)
}) //end

/**
 * @desc add to saved properties
 * @route POST /api/users/buyer/saved-properties/:id
 * //need token to access
 * for when a user is already logged in
 * need jwt in the authorization to access
 * @access private
 */
const addToSavedProperties = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400)
    throw new Error('Property ID could not be found in request parameters')
  }
  if (!valid.isValidObjectId(req.params.id)) {
    res.status(400)
    throw new Error('Invalid property id')
  }

  await Buyer.findByIdAndUpdate(req.user.id, {
    $push: { savedProperties: req.params.id }
  })

  returnSavedProperties(req, res)
}) //end

/**
 * @desc remove from saved properties
 * @route DELETE /api/users/buyer/saved-properties/:id
 * //need token to access
 * for when a user is already logged in
 * need jwt in the authorization to access
 * @access private
 */
const removeFromSavedProperties = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400)
    throw new Error('Property ID could not be found in request parameters')
  }
  if (!valid.isValidObjectId(req.params.id)) {
    res.status(400)
    throw new Error('Invalid property id')
  }

  await Buyer.findByIdAndUpdate(req.user.id, {
    $pull: { savedProperties: req.params.id }
  })

  returnSavedProperties(req, res)

  res.status(200).json(user.savedPosts)
}) //end

// ---

// --- Listing Controllers ---

/**
 * @desc get seller's listings
 * @route GET /api/users/seller/listings
 * //need token to access
 * for when a user is already logged in
 * need jwt in the authorization to access
 * @access private
 */
const getListings = asyncHandler(async (req, res) => {
  returnListings(req, res)
}) //end

/**
 * @desc remove from listings
 * @route DELETE /api/users/seller/listings/:id
 * //need token to access
 * for when a user is already logged in
 * need jwt in the authorization to access
 * @access private
 */
const removeFromListings = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400)
    throw new Error('Property ID could not be found in request parameters')
  }
  if (!valid.isValidObjectId(req.params.id)) {
    res.status(400)
    throw new Error('Invalid property id')
  }

  await Seller.findByIdAndUpdate(req.user.id, {
    $pull: { listings: req.params.id }
  })

  await Buyer.updateMany(
    { savedProperties: req.params.id },
    { $pull: { savedProperties: req.params.id } }
  )

  await Property.findByIdAndDelete(req.params.id)

  returnListings(req, res)
}) //end

/**
 * @desc update listings
 * @route PUT /api/users/seller/listings/:id
 * //need token to access
 * for when a user is already logged in
 * need jwt in the authorization to access
 * @access private
 */
const updateListing = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400)
    throw new Error('Property ID could not be found in request parameters')
  }
  if (!valid.isValidObjectId(req.params.id)) {
    res.status(400)
    throw new Error('Invalid property id')
  }

  const {
    quadrant: quad,
    bathrooms,
    bedrooms,
    type,
    furnished,
    price,
    zipCode,
    city,
    street,
    quadrant
  } = req.body

  const updateCriteria = {
    quad,
    bathrooms,
    bedrooms,
    type,
    furnished,
    price
  }

  const property = await Property.findById(req.params.id)

  await Criteria.findByIdAndUpdate(property.criteria, updateCriteria)

  const updateProp = {
    zipCode,
    city,
    street,
    quadrant
  }

  await Property.findByIdAndUpdate(req.params.id, updateProp)

  returnListings(req, res)
}) //end

//@desc add collection
//@route  POST collection /api/collections/
//@access private
const tmpAdd = asyncHandler(async (req, res) => {
  const {
    quadrant: quad,
    bathrooms,
    bedrooms,
    type,
    furnished,
    price,
    zipCode,
    city,
    street,
    quadrant
  } = req.body

  const criteria = await Criteria.create({
    quad,
    bathrooms,
    bedrooms,
    type,
    furnished,
    price
  })
  const property = await Property.create({
    zipCode,
    city,
    street,
    quadrant,
    criteria: criteria._id,
    seller: req.user.id,
    imgPaths: []
  })

  const user = await Seller.findByIdAndUpdate(req.user.id, {
    $push: { listings: property._id }
  })

  res.status(200).json({
    message: `listing added`
  })
}) //end

// ---

//exports
module.exports = {
  getSavedProperties,
  addToSavedProperties,
  removeFromSavedProperties,
  getListings,
  removeFromListings,
  updateListing,
  tmpAdd
}
