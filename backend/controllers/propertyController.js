const asyncHandler = require('express-async-handler')
const Property = require('../models/propertyModel')
const Seller = require('../models/sellerModel')
const Criteria = require('../models/criteriaModel')
const valid = require('../middleware/validateID')

/**
 * @desc get all properties by page and sort order
 * @route GET /api/properties/:page
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
  } else if (req.body.sort === 'price' || req.body.sort === '-price') {
    criteriaSort = req.body.sort
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

  for (const key in filters) {
    if (filters[key] === '') {
      delete filters[key]
    }
  }

  const matchedCriteria = await Criteria.find(filters)
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
    properties = await Property.find({ criteria: { $in: criteriaIds } })
      // populate reference attributes
      .populate({ path: 'seller', select: '_id email isRealtor company' })
      .populate({ path: 'criteria', sort: criteriaSort }) // populate criteria and sort by date
      .exec()
  }

  if (!properties) {
    res.status(400)
    throw new Error('Error finding properties')
  }

  res.status(200).json(properties)
})

module.exports = {
  getProperties
}
