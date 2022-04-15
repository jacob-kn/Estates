const asyncHandler = require('express-async-handler')
const Fee = require('../models/feeModel')
const valid = require('../middleware/validateID')

/**
 * @desc get fee
 * @route GET /api/fee
 * @access private
 */
const getFee = asyncHandler(async (req, res) => {
  const fee = await Fee.find().exec()

  if (!fee) {
    res.status(400)
    throw new Error('Fee could not be found')
  }

  res.status(200).json(fee)
})

// exports
module.exports = {
  getFee
}
