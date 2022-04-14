const asyncHandler = require('express-async-handler')
const Property = require('../models/propertyModel')
const Seller = require('../models/sellerModel')
const Criteria = require('../models/criteriaModel')
const valid = require('../middleware/validateID')

/**
 * @desc get all properties by page and sort order
 * @route POST /api/properties/page/:page
 * @param {*} req.body - Has page object
 * @access private
 */
const getProperties = asyncHandler(async (req, res) => {
  if (!req.params.page) {
    res.status(400)
    throw new Error('Page number is undefined in parameters')
  }
  if (!req.body.sort) {
    res.status(400)
    throw new Error('Sort is undefined in body')
  }
  let dateSort, criteriaSort
  if (req.body.sort === 'createdAt' || req.body.sort === '-createdAt') {
    dateSort = req.body.sort
  } else if (req.body.sort === 'price') {
    criteriaSort = { 'criteria.price': 1 }
  } else if (req.body.sort === '-price') {
    criteriaSort = { 'criteria.price': -1 }
  }
  if (!dateSort && !criteriaSort) {
    res.status(400)
    throw new Error('Sort is not supported')
  }

  const perPage = 9
  const pagesSkipped = Math.max(1, req.params.page) - 1 // page 1 or lower will be 0

  const {
    quad,
    bathrooms,
    bedrooms,
    type,
    furnished,
    minPrice,
    maxPrice
  } = req.body

  // set up filters
  const filters = {
    quad,
    bathrooms,
    bedrooms,
    type,
    furnished
  }

  if (minPrice || maxPrice) {
    if (!minPrice) {
      filters.price = { $lte: maxPrice }
    } else if (!maxPrice) {
      filters.price = { $gte: minPrice }
    } else {
      filters.price = { $gte: minPrice, $lte: maxPrice }
    }
  }
  if (bathrooms && bathrooms.slice(-1) === '+') {
    // if ends with +
    filters.bathrooms = { $gte: bathrooms.charAt(0) }
  }
  if (bedrooms && bedrooms.slice(-1) === '+') {
    filters.bedrooms = { $gte: bedrooms.charAt(0) }
  }

  for (const key in filters) {
    if (filters[key] === '') {
      delete filters[key]
    }
  }

  const matchedCriteria = await Criteria.find(filters)
    .sort(req.body.sort)
    .select('_id')
    // pagination
    .limit(perPage)
    .skip(perPage * pagesSkipped)
    .exec()

  const criteriaIds = matchedCriteria.map(({ _id }) => _id)

  let properties
  if (dateSort) {
    properties = await Property.find({ criteria: { $in: criteriaIds } })
      .sort(dateSort) // sort by date
      // populate reference attributes
      .populate({ path: 'seller', select: '_id email isRealtor company' })
      .populate('criteria')
      .exec()
  } else {
    properties = await Property.aggregate([
      // filter criteria
      { $match: { criteria: { $in: criteriaIds } } },
      // join seller collection
      {
        $lookup: {
          from: Seller.collection.name,
          localField: 'seller',
          foreignField: '_id',
          as: 'seller'
        }
      },
      // turn array into single object
      { $unwind: '$seller' },
      // remove unwanted attributes from seller
      {
        $project: {
          'seller.password': 0,
          'seller.listings': 0,
          'seller.createdAt': 0,
          'seller.updatedAt': 0,
          'seller.__v': 0
        }
      },
      // join criteria collection
      {
        $lookup: {
          from: Criteria.collection.name,
          localField: 'criteria',
          foreignField: '_id',
          as: 'criteria'
        }
      },
      { $unwind: '$criteria' },
      // sort by criteriaSort
      { $sort: criteriaSort }
    ])
  }

  if (!properties) {
    res.status(400)
    throw new Error('Error finding properties')
  }

  res.status(200).json(properties)
})

/**
 * @desc get count of all properties
 * @route GET /api/properties/property/:id
 * @access private
 */
const getProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id)
    // populate reference attributes
    .populate({ path: 'seller', select: '_id email isRealtor company' })
    .populate('criteria')
    .exec()

  res.status(200).json(property)
})

/**
 * @desc get count of all properties
 * @route POST /api/properties/count
 * @access private
 */
const countProperties = asyncHandler(async (req, res) => {
  const {
    quad,
    bathrooms,
    bedrooms,
    type,
    furnished,
    minPrice,
    maxPrice
  } = req.body

  // set up filters
  const filters = {
    quad,
    bathrooms,
    bedrooms,
    type,
    furnished
  }

  if (minPrice || maxPrice) {
    if (!minPrice) {
      filters.price = { $lte: maxPrice }
    } else if (!maxPrice) {
      filters.price = { $gte: minPrice }
    } else {
      filters.price = { $gte: minPrice, $lte: maxPrice }
    }
  }
  if (bathrooms && bathrooms.slice(-1) === '+') {
    // if ends with +
    filters.bathrooms = { $gte: bathrooms.charAt(0) }
  }
  if (bedrooms && bedrooms.slice(-1) === '+') {
    filters.bedrooms = { $gte: bedrooms.charAt(0) }
  }

  for (const key in filters) {
    if (filters[key] === '' || filters[key] === undefined) {
      delete filters[key]
    }
  }

  await Criteria.countDocuments(filters, function (err, count) {
    res.status(200).json({ count })
  }).exec
})

module.exports = {
  getProperties,
  countProperties,
  getProperty
}
