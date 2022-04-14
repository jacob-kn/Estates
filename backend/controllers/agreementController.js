const asyncHandler = require('express-async-handler')
const Property = require('../models/propertyModel')
const Seller = require('../models/sellerModel')
const Criteria = require('../models/criteriaModel')
const valid = require('../middleware/validateID')
const util = require('util')

/**
 * @desc create a new agreement
 * @route GET /api/agreements/
 * @access private
 */
const createAgreement = asyncHandler(async (req, res) => {
  if (!req.user.id) {
    res.status(400)
    throw new Error('Please Add All Fields')
  }
})

// exports
module.exports = {
  createAgreement,
}